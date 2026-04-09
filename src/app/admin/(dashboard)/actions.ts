'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

export async function deleteProduct(id: string) {
  const supabase = await createClient()

  const { data: product } = await supabase.from('products').select('nameId').eq('id', id).single()

  if (product) {
    const { error: historyError } = await supabase.from('price_history').delete().eq('nameId', product.nameId)
    if (historyError) {
      console.error("Erro ao deletar historico de precos:", historyError)
    }
  }

  const { error } = await supabase.from('products').delete().eq('id', id)
  
  if (error) {
    console.error("Erro ao deletar produto:", error)
    throw new Error("Erro ao deletar produto: " + error.message)
  }
  
  revalidatePath('/admin')
  revalidatePath('/')
}
