import React, { useRef, useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'
import { useNavigate } from 'react-router-dom'


export default function Signup() {
const emailRef = useRef()
const passRef = useRef()
const [error, setError] = useState('')
const navigate = useNavigate()


async function handleSubmit(e) {
e.preventDefault()
setError('')
try {
await createUserWithEmailAndPassword(auth, emailRef.current.value, passRef.current.value)
navigate('/')
} catch (error) {
console.error('Signup error:', error)
if (error.code === 'auth/email-already-in-use') {
setError('Email already in use')
} else if (error.code === 'auth/weak-password') {
setError('Password should be at least 6 characters')
} else if (error.code === 'auth/invalid-email') {
setError('Invalid email address')
} else {
setError(error.message || 'Failed to create account')
}
}
}


return (
<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
<div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100">
<div className="text-center mb-6">
<h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
<p className="text-gray-500 text-sm">Start tracking your job applications</p>
</div>
{error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
<form onSubmit={handleSubmit}>
<label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
<input ref={emailRef} className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" type="email" required placeholder="you@example.com" />
<label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
<input ref={passRef} className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" type="password" required placeholder="At least 6 characters" />
<button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-lg font-medium transition duration-200 shadow-lg hover:shadow-xl">Sign up</button>
</form>
<p className="mt-6 text-center text-sm text-gray-600">Already have an account? <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">Sign in</Link></p>
</div>
</div>
)
}