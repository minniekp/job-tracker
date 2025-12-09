import React from 'react'


export default function InputField({ label, value, onChange, type = "text", required = false }) {
return (
<div className="mb-3">
<label className="block mb-1 font-medium">{label}</label>
<input
type={type}
value={value}
onChange={onChange}
required={required}
className="w-full p-2 border rounded"
/>
</div>
)
}