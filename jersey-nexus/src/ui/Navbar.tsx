import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { ShoppingCart, User2 } from 'lucide-react'

export const Navbar: React.FC = () => {
  const { user, isAdmin, signOut } = useAuth()
  const { count } = useCart()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogoClick = () => navigate('/')

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={handleLogoClick} className="flex items-center gap-2 group">
            <span className="h-8 w-8 rounded bg-brand text-white grid place-items-center font-bold">JN</span>
            <span className="text-lg font-semibold group-hover:text-brand transition-colors">JerseyNexus</span>
          </button>
          <nav className="hidden md:flex items-center gap-6 ml-6 text-sm text-gray-600">
            <Link to="/products" className={location.pathname.startsWith('/products') ? 'text-gray-900' : ''}>Shop</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-brand text-white text-xs grid place-items-center">{count}</span>
            )}
          </Link>
          {!user && (
            <div className="flex items-center gap-2">
              <Link to="/login" className="px-3 py-2 rounded hover:bg-gray-100">Login</Link>
              <Link to="/register" className="btn-primary">Register</Link>
            </div>
          )}
          {user && (
            <div className="flex items-center gap-2">
              {isAdmin && (
                <Link to="/admin" className="px-3 py-2 rounded hover:bg-gray-100">Dashboard</Link>
              )}
              <Link to="/profile" className="inline-flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100">
                <User2 className="h-5 w-5" />
                <span className="hidden sm:inline">Account</span>
              </Link>
              <button onClick={() => signOut()} className="px-3 py-2 rounded hover:bg-gray-100">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

