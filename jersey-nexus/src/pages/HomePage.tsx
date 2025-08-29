import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="">
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              Jerseys for Football, Cricket, Esports, and Basketball
            </h1>
            <p className="mt-4 text-gray-600">Discover premium team kits in NPR with fast local delivery.</p>
            <div className="mt-8 flex items-center gap-4">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="btn-primary" onClick={() => navigate('/products')}>
                Learn More
              </motion.button>
              <Link to="/products" className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">Shop Now</Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-brand/10 to-brand/40"/>
          </div>
        </div>
      </section>
    </div>
  )
}

