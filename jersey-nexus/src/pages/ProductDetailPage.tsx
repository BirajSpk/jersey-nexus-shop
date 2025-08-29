import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const DUMMY: Record<string, { id: string; name: string; category: string; price_npr: number; image_url: string; description: string }> = {
  'fb-barca': { id: 'fb-barca', name: 'FC Barcelona Home Jersey', category: 'Football', price_npr: 3200, image_url: 'https://picsum.photos/seed/barca/800/800', description: 'Premium match-quality fabric with breathable mesh.' },
  'fb-manu': { id: 'fb-manu', name: 'Manchester United Home Jersey', category: 'Football', price_npr: 3000, image_url: 'https://picsum.photos/seed/manu/800/800', description: 'Classic design with modern performance materials.' },
  'cr-nepal': { id: 'cr-nepal', name: 'Nepal National Team Jersey', category: 'Cricket', price_npr: 2800, image_url: 'https://picsum.photos/seed/nepal/800/800', description: 'Support the Rhinos with official team colors.' },
  'cr-india': { id: 'cr-india', name: 'India National Team Jersey', category: 'Cricket', price_npr: 3500, image_url: 'https://picsum.photos/seed/india/800/800', description: 'Breathable and lightweight fit for all-day comfort.' },
  'es-t1': { id: 'es-t1', name: 'T1 Esports Jersey', category: 'Esports', price_npr: 2600, image_url: 'https://picsum.photos/seed/t1/800/800', description: 'Esports performance jersey with bold style.' },
  'es-liquid': { id: 'es-liquid', name: 'Team Liquid Jersey', category: 'Esports', price_npr: 2700, image_url: 'https://picsum.photos/seed/liquid/800/800', description: 'Lightweight, breathable, and built for fans.' },
  'bb-lakers': { id: 'bb-lakers', name: 'LA Lakers Jersey', category: 'Basketball', price_npr: 2900, image_url: 'https://picsum.photos/seed/lakers/800/800', description: 'Iconic purple and gold in premium materials.' },
  'bb-warriors': { id: 'bb-warriors', name: 'GS Warriors Jersey', category: 'Basketball', price_npr: 3100, image_url: 'https://picsum.photos/seed/warriors/800/800', description: 'Show your pride with durable, soft-touch fabric.' },
}

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addToCart, buyNow } = useCart()
  const product = useMemo(() => (id ? DUMMY[id] : null), [id])

  if (!product) return <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">Product not found.</div>

  const handleBuyNow = async () => {
    if (!user) {
      navigate('/login', { state: { from: `/products/${product.id}`, checkout: true } })
      return
    }
    await buyNow(product)
    navigate('/checkout')
  }

  const handleAddToCart = async () => {
    await addToCart(product, 1)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-2 gap-10">
      <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
        <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-500">{product.category}</p>
        <p className="mt-4 text-2xl font-semibold">NPR {product.price_npr}</p>
        <p className="mt-4 text-gray-600">{product.description}</p>
        <div className="mt-8 flex items-center gap-3">
          <button onClick={handleAddToCart} className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50">Add to Cart</button>
          <button onClick={handleBuyNow} className="btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  )
}

