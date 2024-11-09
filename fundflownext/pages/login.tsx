'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import axios from 'axios'

interface LoginProps {
  onLogin: (token: string) => void
}

export default function Login({ onLogin }: LoginProps) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setSuccessMessage(null)

    if (isRegistering && password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const endpoint = isRegistering
        ? 'http://localhost:5000/api/register'
        : 'http://localhost:5000/api/login'

      const response = await axios.post(endpoint, { email, password })
      const { token } = response.data

      if (token) {
        if (rememberMe) {
          localStorage.setItem('token', token)
        } else {
          sessionStorage.setItem('token', token)
        }
        onLogin(token)
        resetForm()
      }

      if (isRegistering) {
        setSuccessMessage('Registration successful! You can now log in.')
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Authentication failed. Please check your credentials.')
      } else {
        setError('An error occurred. Please try again.')
      }
    }
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-1/4 bg-black rounded-lg border-2 border-black/35 hover:shadow-black/50 hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <div className="flex items-center justify-center mb-4">
              <Image 
                src="/F__4_-removebg-preview.png"
                alt="FundFlow Logo"
                width={90}
                height={90}
              />
            </div>

            <h2 className="text-2xl font-Levnam font-semibold text-[#d9d6ba] mb-2">
              {isRegistering ? 'Create an Account' : 'Welcome Back'}
            </h2>
            <p className="font-Levnam font-medium text-[#11a14a] opacity-75 mb-6">
              {isRegistering
                ? 'Please fill in your details to register.'
                : 'Please sign in to your account'}
            </p>

            {error && <div className="mb-4 text-red-600">{error}</div>}
            {successMessage && <div className="mb-4 text-green-600">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
              <div className="font-Levnam font-medium mb-4">
                <label htmlFor="email" className="block text-[#11a14a] text-sm font-bold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-[#d9d6ba] border-[#d9d6ba] rounded-md focus:outline-none focus:ring-2 focus:ring-[#11a14a]"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-[#11a14a] text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-[#d9d6ba] border-[#d9d6ba] rounded-md focus:outline-none focus:ring-2 focus:ring-[#11a14a]"
                  required
                />
              </div>

              {isRegistering && (
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-[#11a14a] text-sm font-bold mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-[#d9d6ba] border-[#d9d6ba] rounded-md focus:outline-none focus:ring-2 focus:ring-[#11a14a]"
                    required
                  />
                </div>
              )}

              <div className="mb-4 font-Levnam font-medium text-[#11a14a]">
                <label htmlFor="rememberMe" className="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="mr-2"
                  />
                  Remember Me
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-[#11a14a] font-Levnam font-medium text-black font-bold py-2 rounded-md hover:bg-[#d9d6ba] transition duration-300"
              >
                {isRegistering ? 'Register' : 'Login'}
              </button>
            </form>

            <p className="font-Levnam font-medium text-[#11a14a] mt-4 text-center">
              {isRegistering ? (
                <span>
                  Already have an account?{' '}
                  <button
                    onClick={() => setIsRegistering(false)}
                    className="text-[#11a14a] hover:underline"
                  >
                    Login here
                  </button>
                </span>
              ) : (
                <span>
                  No account?{' '}
                  <button
                    onClick={() => setIsRegistering(true)}
                    className="text-[#11a14a] hover:underline"
                  >
                    Register here
                  </button>
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}