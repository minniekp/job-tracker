import React from 'react'
import Navbar from '../components/NavBar'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function Dashboard() {
const { currentUser } = useAuth()


return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
<Navbar />
<div className="container mx-auto p-8">
<div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
<h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back{currentUser ? `, ${currentUser.email.split('@')[0]}` : ''} 👋</h1>
<p className="text-gray-600 text-lg">Track your job applications and stay organized</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
<div className="flex items-center justify-between mb-4">
<h3 className="text-lg font-semibold text-gray-700">Quick Start</h3>
<span className="text-3xl">🚀</span>
</div>
<p className="text-gray-600 mb-4">Add your first job application and start tracking</p>
<Link to="/board" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition">Go to Board</Link>
</div>

<div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
<div className="flex items-center justify-between mb-4">
<h3 className="text-lg font-semibold text-gray-700">Organize</h3>
<span className="text-3xl">📊</span>
</div>
<p className="text-gray-600">Drag and drop applications across different stages</p>
</div>

<div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition">
<div className="flex items-center justify-between mb-4">
<h3 className="text-lg font-semibold text-gray-700">Stay Updated</h3>
<span className="text-3xl">✨</span>
</div>
<p className="text-gray-600">Keep notes and links for each application</p>
</div>
</div>
</div>
</div>
)
}