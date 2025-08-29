import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const RegisterPage: React.FC = () => {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const location = useLocation() as any
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await signUp(email, password, name)
    setLoading(false)
    if (res.error) return setError(res.error)
    const redirectTo = location.state?.from ?? '/'
    const shouldCheckout = location.state?.checkout === true
    if (shouldCheckout) navigate('/checkout')
    else navigate(redirectTo)
  }

  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl font-bold mb-6">Create Account</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input className="w-full rounded border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" className="w-full rounded border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm mb-1">Password</label>
          <input type="password" className="w-full rounded border px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">{loading ? 'Creating...' : 'Create account'}</button>
      </form>
      <p className="text-sm text-gray-600 mt-4">Have an account? <Link to="/login" className="text-brand">Login</Link></p>
    </div>
  )
}

