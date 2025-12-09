import React from 'react'
import Navbar from '../components/NavBar'


export default function Settings() {
return (
<div>
<Navbar />
<div className="container mx-auto p-6">
<h2 className="text-xl font-semibold mb-4">Settings</h2>
<p className="text-gray-600">Theme toggles and user preferences can go here.</p>
</div>
</div>
)
}