-- Executar no SQL Editor do Supabase

-- Habilitar a extensão pgcrypto para criar chaves caso precise, embora UUIDs nativos do PostgreSQL sirvam.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Criar a tabela de Produtos
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "nameId" TEXT UNIQUE NOT NULL, -- slug legível
  title TEXT NOT NULL,
  description TEXT,
  current_price NUMERIC(10, 2) NOT NULL,
  "imageUrl" TEXT NOT NULL,
  "affiliateUrl" TEXT NOT NULL,
  category TEXT CHECK (category IN ('notebook', 'tablet', 'monitor')) NOT NULL,
  store TEXT CHECK (store IN ('amazon', 'mercado_livre')) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar a tabela de Histórico de Preços
CREATE TABLE price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "nameId" TEXT NOT NULL REFERENCES products("nameId") ON DELETE CASCADE,
  price NUMERIC(10, 2) NOT NULL,
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Atualização de Timestamp automático em Produtos
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_products
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- -- Políticas RLS (Row Level Security) -- --

-- Habilitar RLS nas tabelas
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;

-- Produtos: Leitura é PÚBLICA (qualquer um pode ver a vitrine)
CREATE POLICY "Leitura Pública de Produtos" 
ON products FOR SELECT 
USING (true);

-- Produtos: Escrita (Insert, Update, Delete) é RESTREITA a usuários Autenticados
CREATE POLICY "Escrita de Produtos apenas Autenticados" 
ON products FOR ALL 
USING (auth.uid() IS NOT NULL);

-- Histórico: Leitura é PÚBLICA
CREATE POLICY "Leitura Pública de Histórico" 
ON price_history FOR SELECT 
USING (true);

-- Histórico: Escrita é RESTRITA a Autenticados
CREATE POLICY "Escrita de Histórico apenas Autenticados" 
ON price_history FOR ALL 
USING (auth.uid() IS NOT NULL);
