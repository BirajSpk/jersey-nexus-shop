import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

type Product = { id: string; name: string; category: string; price_npr: number; description?: string | null; image_url?: string | null }
type Order = { id: string; user_id: string; total_amount: number; status: string; created_at: string }
type UserRow = { id: string; name: string | null; email: string; role: string }

export const AdminDashboardPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [users, setUsers] = useState<UserRow[]>([])
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState<Partial<Product>>({})

  const loadAll = async () => {
    const [{ data: p }, { data: o }, { data: u }] = await Promise.all([
      supabase.from('products').select('*').order('name'),
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('users').select('id, name, email, role').order('email'),
    ])
    setProducts(p ?? [])
    setOrders(o ?? [])
    setUsers(u ?? [])
  }

  useEffect(() => { loadAll() }, [])

  const startEdit = (p?: Product) => {
    setEditing(p ?? { id: '', name: '', category: 'Football', price_npr: 0 })
    setForm(p ?? { category: 'Football' })
  }
  const save = async () => {
    if (!form.name || !form.category || !form.price_npr) return
    if (editing && editing.id) {
      await supabase.from('products').update(form).eq('id', editing.id)
    } else {
      await supabase.from('products').insert(form)
    }
    setEditing(null)
    setForm({})
    await loadAll()
  }
  const remove = async (id: string) => {
    await supabase.from('products').delete().eq('id', id)
    await loadAll()
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Products</h2>
          <button className="btn-primary" onClick={() => startEdit()}>Add Product</button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="border rounded-xl p-4 space-y-2">
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-500">{p.category}</div>
              <div className="font-semibold">NPR {p.price_npr}</div>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded border" onClick={() => startEdit(p)}>Edit</button>
                <button className="px-3 py-1.5 rounded border text-red-600" onClick={() => remove(p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        {editing !== null && (
          <div className="mt-6 border rounded-xl p-4 space-y-3">
            <h3 className="font-semibold">{editing?.id ? 'Edit Product' : 'New Product'}</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <input className="rounded border px-3 py-2" placeholder="Name" value={form.name ?? ''} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              <select className="rounded border px-3 py-2" value={form.category ?? 'Football'} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                <option>Football</option>
                <option>Cricket</option>
                <option>Esports</option>
                <option>Basketball</option>
              </select>
              <input className="rounded border px-3 py-2" placeholder="Price NPR" type="number" value={form.price_npr ?? 0} onChange={(e) => setForm((f) => ({ ...f, price_npr: Number(e.target.value) }))} />
              <input className="rounded border px-3 py-2" placeholder="Image URL" value={form.image_url ?? ''} onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))} />
            </div>
            <textarea className="w-full rounded border px-3 py-2" placeholder="Description" value={form.description ?? ''} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            <div className="flex gap-2">
              <button className="btn-primary" onClick={save}>Save</button>
              <button className="px-3 py-2 rounded border" onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">User</th>
                <th className="p-2 text-left">Total (NPR)</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="p-2">{o.id}</td>
                  <td className="p-2">{o.user_id}</td>
                  <td className="p-2">{o.total_amount}</td>
                  <td className="p-2">{o.status}</td>
                  <td className="p-2">{new Date(o.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Users</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((u) => (
            <div key={u.id} className="border rounded-xl p-4">
              <div className="font-medium">{u.name ?? '—'}</div>
              <div className="text-sm text-gray-500">{u.email}</div>
              <div className="text-xs mt-1">Role: {u.role}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

