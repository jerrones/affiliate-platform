import { createClient } from '@/utils/supabase/server';
import styles from './components.module.scss';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

export default async function PriceHistory({ nameId }: { nameId: string }) {
  const supabase = await createClient();

  // Buscar histórico dos últimos 90 dias
  const { data: history } = await supabase
    .from('price_history')
    .select('price, recorded_at')
    .eq('nameId', nameId)
    .gte('recorded_at', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString())
    .order('recorded_at', { ascending: true });

  if (!history || history.length < 2) {
    return (
      <div className={styles.priceHistoryEmpty}>
        Preço recente cadastrado. Histórico em formação.
      </div>
    );
  }

  const firstPrice = history[0].price;
  const lastPrice = history[history.length - 1].price;
  const diff = lastPrice - firstPrice;

  let Icon = Minus;
  let colorClass = styles.neutral;
  let diffText = "Estável";

  if (diff < 0) {
    Icon = TrendingDown;
    colorClass = styles.good;
    diffText = `Caiu ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Math.abs(diff))}`;
  } else if (diff > 0) {
    Icon = TrendingUp;
    colorClass = styles.bad;
    diffText = `Subiu ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(diff)}`;
  }

  // A simple representation of prices
  const maxPrice = Math.max(...history.map(h => h.price));
  const minPrice = Math.min(...history.map(h => h.price));
  const range = maxPrice - minPrice || 1; // prevent div by zero

  return (
    <div className={styles.priceHistory}>
      <div className={styles.historyHeader}>
        <span className={styles.historyTitle}>Histórico (90 dias)</span>
        <div className={`${styles.trend} ${colorClass}`}>
          <Icon size={16} />
          <span>{diffText}</span>
        </div>
      </div>
      
      <div className={styles.chart}>
        {history.slice(-10).map((point, i) => {
           const heightPercent = 20 + ((point.price - minPrice) / range) * 80;
           return (
             <div key={i} className={styles.barContainer} title={`R$ ${point.price}`}>
               <div 
                 className={styles.bar} 
                 style={{ height: `${heightPercent}%` }}
               />
             </div>
           );
        })}
      </div>
    </div>
  );
}
