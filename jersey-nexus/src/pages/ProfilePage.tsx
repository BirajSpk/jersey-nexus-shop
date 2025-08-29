import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'

export const ProfilePage: React.FC = () => {
  const { user, profile, refreshProfile } = useAuth()
  const [name, setName] = useState(profile?.name ?? '')
  const [email, setEmail] = useState(profile?.email ?? '')
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar_url ?? '')
  const [password, setPassword] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setName(profile?.name ?? '')
    setEmail(profile?.email ?? '')
    setAvatarUrl(profile?.avatar_url ?? '')
  }, [profile?.id])

  const saveProfile = async () => {
    if (!user) return
    setSaving(true)
    await supabase.from('users').update({ name, email, avatar_url: avatarUrl }).eq('id', user.id)
    if (password) {
      await supabase.auth.updateUser({ password })
    }
    await refreshProfile()
    setSaving(false)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <input className="w-full rounded border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input type="email" className="w-full rounded border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">New Password</label>
          <input type="password" className="w-full rounded border px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">Profile Picture URL</label>
          <input className="w-full rounded border px-3 py-2" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
        </div>
        <button onClick={saveProfile} disabled={saving} className="btn-primary">{saving ? 'Saving...' : 'Save Changes'}</button>
      </div>
    </div>
  )
}

