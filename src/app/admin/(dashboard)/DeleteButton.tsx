'use client'

import { useTransition } from "react"
import { deleteProduct } from "./actions"
import styles from "./admin.module.scss"

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button 
      className={styles.logoutBtn} 
      style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', width: 'auto', border: '1px solid currentColor', backgroundColor: 'transparent' }} 
      disabled={isPending}
      onClick={() => {
        if (confirm("Tem certeza que deseja excluir DEFINITIVAMENTE este produto? Todas as informações e histórico de preços serão apagados.")) {
          startTransition(() => {
            deleteProduct(id)
          })
        }
      }}
    >
      {isPending ? 'Excluindo...' : 'Deletar'}
    </button>
  )
}
