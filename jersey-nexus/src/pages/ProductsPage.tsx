import React from 'react'
import { Link } from 'react-router-dom'

type Product = {
  id: string
  name: string
  category: 'Football' | 'Cricket' | 'Esports' | 'Basketball'
  price_npr: number
  image_url: string
}

const DUMMY_PRODUCTS: Product[] = [
  { id: 'fb-barca', name: 'FC Barcelona Home Jersey', category: 'Football', price_npr: 3200, image_url: 'https://picsum.photos/seed/barca/600/600' },
  { id: 'fb-manu', name: 'Manchester United Home Jersey', category: 'Football', price_npr: 3000, image_url: 'https://picsum.photos/seed/manu/600/600' },
  { id: 'cr-nepal', name: 'Nepal National Team Jersey', category: 'Cricket', price_npr: 2800, image_url: 'https://picsum.photos/seed/nepal/600/600' },
  { id: 'cr-india', name: 'India National Team Jersey', category: 'Cricket', price_npr: 3500, image_url: 'https://picsum.photos/seed/india/600/600' },
  { id: 'es-t1', name: 'T1 Esports Jersey', category: 'Esports', price_npr: 2600, image_url: 'https://picsum.photos/seed/t1/600/600' },
  { id: 'es-liquid', name: 'Team Liquid Jersey', category: 'Esports', price_npr: 2700, image_url: 'https://picsum.photos/seed/liquid/600/600' },
  { id: 'bb-lakers', name: 'LA Lakers Jersey', category: 'Basketball', price_npr: 2900, image_url: 'https://picsum.photos/seed/lakers/600/600' },
  { id: 'bb-warriors', name: 'GS Warriors Jersey', category: 'Basketball', price_npr: 3100, image_url: 'https://picsum.photos/seed/warriors/600/600' },
]

export const ProductsPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Featured Jerseys</h2>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {DUMMY_PRODUCTS.map((p) => (
          <Link key={p.id} to={`/products/${p.id}`} className="group rounded-xl overflow-hidden border hover:shadow transition-all">
            <div className="aspect-square bg-gray-100 overflow-hidden">
              <img src={p.image_url} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-4">
              <h3 className="font-medium group-hover:text-brand">{p.name}</h3>
              <p className="text-sm text-gray-500">{p.category}</p>
              <p className="mt-2 font-semibold">NPR {p.price_npr}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

