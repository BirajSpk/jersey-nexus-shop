import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export const CartPage: React.FC = () => {
  const { items, count, updateQty, removeFromCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const total = items.reduce((sum, i) => sum + i.price_npr * i.quantity, 0)

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/checkout', checkout: true } })
      return
    }
    navigate('/checkout')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {count === 0 ? (
        <div className="text-gray-600">Cart is empty. <Link className="text-brand" to="/products">Shop now</Link></div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((i) => (
              <div key={i.id} className="flex gap-4 items-center border rounded-xl p-4">
                <img src={i.image_url ?? 'https://picsum.photos/seed/placeholder/100/100'} alt={i.name} className="h-20 w-20 rounded object-cover" />
                <div className="flex-1">
                  <div className="font-medium">{i.name}</div>
                  <div className="text-sm text-gray-500">NPR {i.price_npr}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(i.product_id, Math.max(1, i.quantity - 1))} className="h-8 w-8 border rounded">-</button>
                  <span className="w-8 text-center">{i.quantity}</span>
                  <button onClick={() => updateQty(i.product_id, i.quantity + 1)} className="h-8 w-8 border rounded">+</button>
                </div>
                <button onClick={() => removeFromCart(i.product_id)} className="text-red-600 hover:underline">Remove</button>
              </div>
            ))}
          </div>
          <aside className="border rounded-xl p-6 h-fit">
            <div className="flex items-center justify-between font-medium">
              <span>Subtotal</span>
              <span>NPR {total}</span>
            </div>
            <button onClick={handleCheckout} className="btn-primary w-full mt-4">Checkout</button>
          </aside>
        </div>
      )}
    </div>
  )
}

