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
} catch {
setError('Failed to create account')
}
}


return (
<div className="flex items-center justify-center min-h-screen">
<div className="bg-white p-8 rounded shadow w-full max-w-md">
<h2 className="text-2xl font-semibold mb-4">Create account</h2>
{error && <div className="text-red-500 mb-2">{error}</div>}
<form onSubmit={handleSubmit}>
<label className="block mb-2">Email</label>
<input ref={emailRef} className="w-full p-2 border rounded mb-4" type="email" required />
<label className="block mb-2">Password</label>
<input ref={passRef} className="w-full p-2 border rounded mb-4" type="password" required />
<button className="w-full bg-green-600 text-white py-2 rounded">Sign up</button>
</form>
</div>
</div>
)
}