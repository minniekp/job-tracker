import React from 'react'


export default function Modal({ title, children, onClose }) {
return (
<div className="fixed inset-0 bg-black/30 flex items-center justify-center">
<div className="bg-white p-6 rounded w-full max-w-md">
<div className="flex justify-between items-center mb-4">
<h3 className="text-lg font-semibold">{title}</h3>
<button onClick={onClose} className="text-red-500 text-lg">✕</button>
</div>
{children}
</div>
</div>
)
}