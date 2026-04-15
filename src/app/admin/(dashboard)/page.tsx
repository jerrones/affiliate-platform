import { createClient } from "@/utils/supabase/server";
import styles from "./admin.module.scss";
import Link from "next/link";
import { Plus } from "lucide-react";
import DeleteButton from "./DeleteButton";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("updated_at", { ascending: false });

  return (
    <>
      <div className={styles.pageHeader}>
        <h1>Produtos Cadastrados</h1>
        <Link href="/admin/new" className={styles.primaryBtn}>
          <Plus size={20} />
          Novo Produto
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Título</th>
              <th>Categoria</th>
              <th>Preço Atual</th>
              <th>Loja</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {!products || products.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "2rem" }}>
                  Nenhum produto cadastrado ainda.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.imageUrl} alt={product.title} className={styles.itemImage} />
                  </td>
                  <td>{product.title}</td>
                  <td style={{ textTransform: "capitalize" }}>{product.category}</td>
                  <td>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.current_price)}
                  </td>
                  <td style={{ textTransform: "capitalize", color: product.store === 'amazon' ? 'var(--amazon-color)' : 'var(--ml-color)' }}>
                    {product.store.replace('_', ' ')}
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link href={`/admin/edit/${product.id}`} className={styles.primaryBtn} style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}>
                        Editar
                      </Link>
                      <DeleteButton id={product.id} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
