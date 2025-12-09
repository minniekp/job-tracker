import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import JobBoard from './pages/JobBoard'
import { useAuth } from './context/AuthContext'


function ProtectedRoute({ children }) {
const { currentUser } = useAuth()
return currentUser ? children : <Navigate to="/login" />
}


export default function App() {
return (
<div className="min-h-screen bg-gray-50">
<Routes>
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route
path="/"
element={
<ProtectedRoute>
<Dashboard />
</ProtectedRoute>
}
/>
<Route
path="/board"
element={
<ProtectedRoute>
<JobBoard />
</ProtectedRoute>
}
/>
</Routes>
</div>
)
}