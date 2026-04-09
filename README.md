# Affiliate Platform - Plataforma para afiliados Amazon e/ou Mercado Livre

Este repositório contém a implementação de uma plataforma para afiliados **Amazon** e/ou **Mercado Livre** que precisam atender aos requisitos do programa e ter uma página própria de divulgação dos produtos. O repositório segue as políticas da licença **MIT**, leia o arquivo.

## Tecnologias e Ferramentas

- **Next 16.2**
- **React 19.2**
- **Sass**
- **Supabase**

## Instalação e Configuração

### 1. Clonar o Repositório

```bash
git clone git@github.com:jerrones/affiliate-platform.git
cd affiliate-platform
```

### 2. Configurar Supabase

Crie um projeto no Supabase, depois execute o SQL Editor e cole o código que está em `/supabase/schema.sql`. Em seguida, crie um arquivo `.env` na raiz do projeto e adicione a `NEXT_PUBLIC_SUPABASE_URL` e a `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### 3. Instalar Dependências

```bash
npm install
```

### 4. Rodar a aplicação

```bash
npm run dev
```
