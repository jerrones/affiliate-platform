import { createClient } from "@/utils/supabase/server";
import styles from "./page.module.scss";
import ProductCard from "@/components/ProductCard";
import HeaderPublic from "@/components/HeaderPublic";
import { Suspense } from "react";

export const revalidate = 60;

export default async function Home() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("updated_at", { ascending: false });

  return (
    <>
      <HeaderPublic />
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.hero}>
            <h1>As Melhores Ofertas Tech</h1>
            <p>
              Analisamos Notebooks, Tablets e Monitores cruzando o histórico de preços para você comprar só quando realmente vale a pena.
            </p>
          </div>
        </header>

      <section className={styles.productsSection}>
        {!products || products.length === 0 ? (
          <div className={styles.emptyState}>
            Nenhuma promoção ativa no momento. Volte mais tarde!
          </div>
        ) : (
          <div className={styles.grid}>
            {products.map((product) => (
              <Suspense key={product.id} fallback={<div className={styles.cardSkeleton} />}>
                <ProductCard product={product} />
              </Suspense>
            ))}
          </div>
        )}
      </section>
      
      <footer className={styles.footer}>
        <p>Participamos do Programa de Associados da Amazon e do Mercado Livre. Ao comprar pelos nossos links, podemos receber uma comissão sem custo extra para você.</p>
      </footer>
    </main>
    </>
  );
}
