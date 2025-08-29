import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from './AuthContext'

export type CartItem = {
  id: string
  product_id: string
  name: string
  price_npr: number
  image_url: string | null
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  count: number
  addToCart: (product: { id: string; name: string; price_npr: number; image_url?: string | null }, quantity?: number) => Promise<void>
  buyNow: (product: { id: string; name: string; price_npr: number; image_url?: string | null }) => Promise<void>
  removeFromCart: (productId: string) => Promise<void>
  updateQty: (productId: string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  loading: boolean
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)

  const loadCart = async () => {
    if (!user) {
      setItems([])
      return
    }
    setLoading(true)
    const { data } = await supabase
      .from('cart')
      .select('id, product_id, quantity, products(name, price_npr, image_url)')
      .eq('user_id', user.id)
    const next: CartItem[] = (data ?? []).map((row: any) => ({
      id: row.id,
      product_id: row.product_id,
      name: row.products?.name ?? '',
      price_npr: row.products?.price_npr ?? 0,
      image_url: row.products?.image_url ?? null,
      quantity: row.quantity,
    }))
    setItems(next)
    setLoading(false)
  }

  useEffect(() => {
    loadCart()
  }, [user?.id])

  const addToCart: CartContextValue['addToCart'] = async (product, quantity = 1) => {
    if (!user) {
      // Optimistic local cart for guests
      setItems((prev) => {
        const existing = prev.find((i) => i.product_id === product.id)
        if (existing) {
          return prev.map((i) => i.product_id === product.id ? { ...i, quantity: i.quantity + quantity } : i)
        }
        return [
          ...prev,
          { id: crypto.randomUUID(), product_id: product.id, name: product.name, price_npr: product.price_npr, image_url: product.image_url ?? null, quantity },
        ]
      })
      return
    }
    await supabase.rpc('upsert_cart_item', { p_user_id: user.id, p_product_id: product.id, p_quantity: quantity })
    await loadCart()
  }

  const buyNow: CartContextValue['buyNow'] = async (product) => {
    await addToCart(product, 1)
    // Navigation handled in components after calling buyNow
  }

  const removeFromCart: CartContextValue['removeFromCart'] = async (productId) => {
    if (!user) {
      setItems((prev) => prev.filter((i) => i.product_id !== productId))
      return
    }
    await supabase.from('cart').delete().match({ user_id: user.id, product_id: productId })
    await loadCart()
  }

  const updateQty: CartContextValue['updateQty'] = async (productId, quantity) => {
    if (!user) {
      setItems((prev) => prev.map((i) => i.product_id === productId ? { ...i, quantity } : i))
      return
    }
    await supabase.from('cart').update({ quantity }).match({ user_id: user.id, product_id: productId })
    await loadCart()
  }

  const clearCart: CartContextValue['clearCart'] = async () => {
    if (!user) {
      setItems([])
      return
    }
    await supabase.from('cart').delete().eq('user_id', user.id)
    await loadCart()
  }

  const value = useMemo<CartContextValue>(() => ({
    items,
    count: items.reduce((sum, i) => sum + i.quantity, 0),
    addToCart,
    buyNow,
    removeFromCart,
    updateQty,
    clearCart,
    loading,
  }), [items, loading])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

