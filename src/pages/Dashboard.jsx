import React from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function Dashboard() {
const { currentUser } = useAuth()


return (
<div>
<Navbar />
<div className="container mx-auto p-6">
<h1 className="text-2xl font-semibold">Welcome{currentUser ? `, ${currentUser.email}` : ''}</h1>
<p className="mt-4">This is your job tracker dashboard. Click "Board" to manage applications.</p>
<div className="mt-6">
<Link to="/board" className="px-4 py-2 bg-blue-600 text-white rounded">Go to Board</Link>
</div>
</div>
</div>
)
}