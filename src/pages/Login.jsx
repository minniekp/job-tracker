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
<div className="flex items-center justify-center min-h-screen">
<div className="bg-white p-8 rounded shadow w-full max-w-md">
<h2 className="text-2xl font-semibold mb-4">Sign in</h2>
{error && <div className="text-red-500 mb-2">{error}</div>}
<form onSubmit={handleSubmit}>
<label className="block mb-2">Email</label>
<input ref={emailRef} className="w-full p-2 border rounded mb-4" type="email" required />
<label className="block mb-2">Password</label>
<input ref={passRef} className="w-full p-2 border rounded mb-4" type="password" required />
<button className="w-full bg-blue-600 text-white py-2 rounded">Sign in</button>
</form>
<p className="mt-4 text-sm">Don't have an account? <Link to="/signup" className="text-blue-600">Sign up</Link></p>
</div>
</div>
)
}