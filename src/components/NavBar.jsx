import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function Navbar() {
const { currentUser, logout } = useAuth()


async function handleLogout() {
await logout()
window.location.href = '/login'
}


return (
<nav className="bg-white shadow-md border-b border-gray-100">
<div className="container mx-auto px-6 py-4 flex justify-between items-center">
<Link to="/" className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Job Tracker</Link>
<div className="flex items-center gap-6">
<Link to="/board" className="text-gray-700 hover:text-blue-600 font-medium transition">Board</Link>
{currentUser ? (
<button onClick={handleLogout} className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition">Logout</button>
) : (
<Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Login</Link>
)}
</div>
</div>
</nav>
)
}