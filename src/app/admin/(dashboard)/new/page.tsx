import styles from "../admin.module.scss";
import { addProduct } from "./actions";

export default function NewProductPage() {
  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Adicionar Novo Produto</h1>
      </div>

      <form action={addProduct} className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Título do Produto</label>
          <input type="text" id="title" name="title" required placeholder="Ex: MacBook Air M2" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nameId">Name ID (slug / url limpa)</label>
          <input type="text" id="nameId" name="nameId" required placeholder="ex: macbook-air-m2-256" />
        </div>

        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label htmlFor="description">Descrição Breve</label>
          <textarea id="description" name="description" placeholder="Destaques do produto..." />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="current_price">Preço Atual</label>
          <input type="number" step="0.01" id="current_price" name="current_price" required placeholder="4999.99" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Categoria</label>
          <select id="category" name="category" required>
            <option value="notebook">Notebook</option>
            <option value="tablet">Tablet</option>
            <option value="monitor">Monitor</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="store">Loja Afiliada</label>
          <select id="store" name="store" required>
            <option value="amazon">Amazon</option>
            <option value="mercado_livre">Mercado Livre</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="imageUrl">URL da Imagem</label>
          <input type="url" id="imageUrl" name="imageUrl" required placeholder="https://..." />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="affiliateUrl">Seu Link de Afiliado</label>
          <input type="url" id="affiliateUrl" name="affiliateUrl" required placeholder="https://amzn.to/..." />
        </div>

        <div className={styles.fullWidth}>
          <button type="submit" className={styles.primaryBtn} style={{ padding: '0.75rem 2rem', fontSize: '1rem', marginTop: '1rem' }}>
            Salvar Produto e Iniciar Histórico
          </button>
        </div>
      </form>
    </>
  );
}
