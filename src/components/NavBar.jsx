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
<nav className="bg-white shadow">
<div className="container mx-auto px-4 py-3 flex justify-between items-center">
<Link to="/" className="font-bold text-lg">Job Tracker</Link>
<div className="flex items-center gap-4">
<Link to="/board" className="text-gray-700">Board</Link>
{currentUser ? (
<button onClick={handleLogout} className="text-red-500">Logout</button>
) : (
<Link to="/login" className="text-blue-600">Login</Link>
)}
</div>
</div>
</nav>
)
}