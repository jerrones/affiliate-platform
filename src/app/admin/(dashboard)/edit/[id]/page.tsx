import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import styles from "../../admin.module.scss";
import { editProduct } from "./actions";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Editar Produto</h1>
      </div>

      <form action={editProduct} className={styles.formGrid}>
        <input type="hidden" name="id" value={product.id} />

        <div className={styles.formGroup}>
          <label htmlFor="title">Título do Produto</label>
          <input type="text" id="title" name="title" required defaultValue={product.title} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nameId">Name ID (slug / url limpa)</label>
          <input type="text" id="nameId" name="nameId" required defaultValue={product.nameId} />
        </div>

        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label htmlFor="description">Descrição Breve</label>
          <textarea id="description" name="description" defaultValue={product.description} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="current_price">Preço Atual</label>
          <input type="number" step="0.01" id="current_price" name="current_price" required defaultValue={product.current_price} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Categoria</label>
          <select id="category" name="category" required defaultValue={product.category}>
            <option value="notebook">Notebook</option>
            <option value="tablet">Tablet</option>
            <option value="monitor">Monitor</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="store">Loja Afiliada</label>
          <select id="store" name="store" required defaultValue={product.store}>
            <option value="amazon">Amazon</option>
            <option value="mercado_livre">Mercado Livre</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="imageUrl">URL da Imagem</label>
          <input type="url" id="imageUrl" name="imageUrl" required defaultValue={product.imageUrl} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="affiliateUrl">Seu Link de Afiliado</label>
          <input type="url" id="affiliateUrl" name="affiliateUrl" required defaultValue={product.affiliateUrl} />
        </div>

        <div className={styles.fullWidth}>
          <button type="submit" className={styles.primaryBtn} style={{ padding: '0.75rem 2rem', fontSize: '1rem', marginTop: '1rem' }}>
            Salvar Alterações
          </button>
        </div>
      </form>
    </>
  );
}
