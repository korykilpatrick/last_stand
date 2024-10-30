'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cookies } from 'next/headers'

export default function Home() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'chattanooga') {
      // Set cookie with authentication
      document.cookie = 'authenticated=true; path=/'
      router.push('/dashboard')
    } else {
      setError(true)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full p-6">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Kory's Last Stand
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setError(false)
              setPassword(e.target.value)
            }}
            placeholder="Enter password"
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
          />
          {error && (
            <p className="text-red-500 text-sm">Incorrect password</p>
          )}
          <button 
            type="submit"
            className="w-full p-3 rounded bg-blue-600 text-white font-medium hover:bg-blue-700"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  )
}