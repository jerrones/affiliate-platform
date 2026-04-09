import styles from "./components.module.scss";
import PriceHistory from "./PriceHistory";
import { ExternalLink, ShoppingCart } from "lucide-react";
import Image from "next/image";

type Product = {
  id: string;
  nameId: string;
  title: string;
  description: string;
  current_price: number;
  imageUrl: string;
  affiliateUrl: string;
  category: string;
  store: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const isAmazon = product.store === 'amazon';
  
  return (
    <article className={styles.productCard}>
      <div className={styles.imageWrapper}>
        {/* Usando tag obj-fit ou img comum de html para domínios externos q n controlamos */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={product.imageUrl} 
          alt={product.title} 
          className={styles.productImage}
        />
        <div className={styles.categoryBadge}>{product.category}</div>
      </div>
      
      <div className={styles.cardContent}>
        <h2 className={styles.title} title={product.title}>{product.title}</h2>
        <div className={styles.descriptionTags}>
          {product.description.split('|').map((item, idx) => {
            const text = item.trim();
            if (!text) return null;
            return (
              <span key={idx} className={styles.descBadge}>
                {text}
              </span>
            );
          })}
        </div>
        
        <div className={styles.priceRow}>
          <span className={styles.priceLabel}>Menor Preço</span>
          <span className={styles.price}>
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.current_price)}
          </span>
        </div>
        
        {/* Price History Server Component */}
        <div className={styles.historyWrapper}>
          <PriceHistory nameId={product.nameId} />
        </div>
        
        <a 
          href={product.affiliateUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`${styles.affiliateBtn} ${isAmazon ? styles.amazonBtn : styles.mlBtn}`}
        >
          <ShoppingCart size={18} />
          Comprar na {isAmazon ? 'Amazon' : 'Mercado Livre'}
          <ExternalLink size={16} style={{ marginLeft: 'auto' }} />
        </a>
      </div>
    </article>
  );
}
