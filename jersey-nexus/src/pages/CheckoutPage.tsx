import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

export const CheckoutPage: React.FC = () => {
  const { items, clearCart } = useCart()
  const { user } = useAuth()
  const [placing, setPlacing] = useState(false)

  const total = items.reduce((sum, i) => sum + i.price_npr * i.quantity, 0)

  const placeOrder = async () => {
    if (!user || items.length === 0) return
    setPlacing(true)
    const { data: order, error } = await supabase
      .from('orders')
      .insert({ user_id: user.id, total_amount: total, status: 'pending' })
      .select('id')
      .single()
    if (!error && order) {
      const orderItems = items.map((i) => ({ order_id: order.id, product_id: i.product_id, quantity: i.quantity, price_npr: i.price_npr }))
      await supabase.from('order_items').insert(orderItems)
      await clearCart()
      alert('Order placed!')
    }
    setPlacing(false)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <div className="space-y-3">
        {items.map((i) => (
          <div key={i.id} className="flex justify-between text-sm">
            <span>{i.name} × {i.quantity}</span>
            <span>NPR {i.price_npr * i.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between font-semibold border-t pt-3">
          <span>Total</span>
          <span>NPR {total}</span>
        </div>
      </div>
      <button disabled={placing || items.length === 0} onClick={placeOrder} className="btn-primary mt-6">
        {placing ? 'Placing...' : 'Place Order'}
      </button>
    </div>
  )
}

