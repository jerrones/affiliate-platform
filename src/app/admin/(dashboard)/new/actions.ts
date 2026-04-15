'use server'

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function addProduct(formData: FormData) {
  const supabase = await createClient()

  // 1. Extrair os valores do Form
  const title = formData.get("title") as string
  const nameId = formData.get("nameId") as string
  const description = formData.get("description") as string
  const current_priceRaw = formData.get("current_price") as string
  const imageUrl = formData.get("imageUrl") as string
  const affiliateUrl = formData.get("affiliateUrl") as string
  const category = formData.get("category") as string
  const store = formData.get("store") as string

  // Converter preço
  const current_price = parseFloat(current_priceRaw.replace(',', '.'))

  // 2. Inserir ou atualizar na tabela 'products'
  const { error: productError } = await supabase.from("products").upsert({
    nameId,
    title,
    description,
    current_price,
    imageUrl,
    affiliateUrl,
    category,
    store
  }, {
    onConflict: 'nameId'
  })

  if (productError) {
    console.error("Erro ao inserir/atualizar produto:", productError)
    throw new Error("Erro ao salvar produto.")
  }

  // 3. Inserir na tabela 'price_history' via Trigger ou Manualmente (faremos manualmenrte por agora)
  const { error: historyError } = await supabase.from("price_history").insert({
    nameId,
    price: current_price
  })

  if (historyError) {
    console.error("Erro ao criar histórico:", historyError)
    // Mesmo que o histórico falhe, o produto foi criado, mas o ideal seria transação.
  }

  // 4. Revalidar rotas e redirecionar
  revalidatePath('/admin')
  revalidatePath('/')
  redirect('/admin')
}
