'use server'

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function editProduct(formData: FormData) {
  const supabase = await createClient()

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const nameId = formData.get("nameId") as string
  const description = formData.get("description") as string
  const current_priceRaw = formData.get("current_price") as string
  const imageUrl = formData.get("imageUrl") as string
  const affiliateUrl = formData.get("affiliateUrl") as string
  const category = formData.get("category") as string
  const store = formData.get("store") as string

  const current_price = parseFloat(current_priceRaw.replace(',', '.'))

  const { data: oldProduct } = await supabase.from("products").select("current_price").eq("id", id).single()

  const { error: productError } = await supabase.from("products").update({
    nameId,
    title,
    description,
    current_price,
    imageUrl,
    affiliateUrl,
    category,
    store
  }).eq("id", id)

  if (productError) {
    console.error("Erro ao atualizar produto:", productError)
    throw new Error("Erro ao atualizar produto.")
  }

  if (oldProduct && oldProduct.current_price !== current_price) {
    const { error: historyError } = await supabase.from("price_history").insert({
      nameId,
      price: current_price
    })
    if (historyError) {
      console.error("Erro ao inserir histórico:", historyError)
    }
  }

  revalidatePath('/admin')
  revalidatePath('/')
  redirect('/admin')
}
