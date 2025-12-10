import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'


export default function Login() {
const emailRef = useRef()
const passRef = useRef()
const [error, setError] = useState('')
const navigate = useNavigate()


async function handleSubmit(e) {
e.preventDefault()
setError('')
try {
await signInWithEmailAndPassword(auth, emailRef.current.value, passRef.current.value)
navigate('/')
} catch {
setError('Failed to sign in')
}
}


return (
<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
<div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
<div className="text-center mb-6">
<h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
<p className="text-gray-500 text-sm">Sign in to continue to your job tracker</p>
</div>
{error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
<form onSubmit={handleSubmit}>
<label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
<input ref={emailRef} className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" type="email" required placeholder="you@example.com" />
<label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
<input ref={passRef} className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" type="password" required placeholder="••••••••" />
<button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-medium transition duration-200 shadow-lg hover:shadow-xl">Sign in</button>
</form>
<p className="mt-6 text-center text-sm text-gray-600">Don't have an account? <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">Sign up</Link></p>
</div>
</div>
)
}