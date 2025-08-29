import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '../ui/Navbar'

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t py-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} JerseyNexus</footer>
    </div>
  )
}

