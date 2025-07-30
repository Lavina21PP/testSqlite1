'use client'
import { useEffect, useState } from 'react'

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    fetch('/api/users').then(res => res.json()).then(setUsers)
  }, [])

  const addUser = async () => {
    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email }),
    })
    const newUser = await res.json()
    setUsers([...users, newUser])
    setName('')
    setEmail('')
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="mb-4">
        <input
          className="border px-2 py-1 mr-2"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="border px-2 py-1 mr-2"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-1" onClick={addUser}>Add</button>
      </div>
      <ul>
        {users.map((u: any) => (
          <li key={u.id} className="border-b py-2">{u.name} - {u.email}</li>
        ))}
      </ul>
    </div>
  )
}
