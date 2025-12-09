import React, { useEffect, useState } from 'react'
import Navbar from '../components/NavBar'
import { collection, addDoc, onSnapshot, doc, updateDoc, query, orderBy } from 'firebase/firestore'
import { db } from '../services/firebase'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected']


export default function JobBoard() {
const [jobs, setJobs] = useState([])
const [loading, setLoading] = useState(true)
const [showModal, setShowModal] = useState(false)
const [form, setForm] = useState({ company: '', role: '', link: '', status: 'Applied', notes: '' })


useEffect(() => {
const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'))
const unsubscribe = onSnapshot(q, snapshot => {
const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
setJobs(data)
setLoading(false)
})
return unsubscribe
}, [])


async function addJob(e) {
e.preventDefault()
await addDoc(collection(db, 'jobs'), { ...form, createdAt: new Date() })
setForm({ company: '', role: '', link: '', status: 'Applied', notes: '' })
setShowModal(false)
}


async function onDragEnd(result) {
const { destination, source, draggableId } = result
if (!destination) return
if (destination.droppableId === source.droppableId && destination.index === source.index) return


// update status for the job
const jobId = draggableId
const newStatus = destination.droppableId
const jobRef = doc(db, 'jobs', jobId)
await updateDoc(jobRef, { status: newStatus })
}

return (
    <div>
<Navbar />
<div className="container mx-auto p-6">
<div className="flex justify-between items-center">
<h2 className="text-xl font-semibold">Job Board</h2>
<div>
<button onClick={() => setShowModal(true)} className="px-4 py-2 bg-green-600 text-white rounded">Add Job</button>
</div>
</div>

{loading ? <p className="mt-4">Loading...</p> : (
<div className="mt-6 grid grid-cols-4 gap-4">
<DragDropContext onDragEnd={onDragEnd}>
{STATUSES.map(status => (
<Droppable droppableId={status} key={status}>
{(provided) => (
<div ref={provided.innerRef} {...provided.droppableProps} className="bg-white p-4 rounded shadow min-h-[300px]">
<h3 className="font-semibold mb-2">{status}</h3>
{jobs.filter(j => j.status === status).map((job, index) => (
<Draggable key={job.id} draggableId={job.id} index={index}>
{(provided) => (
<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="p-3 mb-3 border rounded">
<div className="flex justify-between">
<div>
<div className="font-semibold">{job.company} — {job.role}</div>
<a href={job.link} target="_blank" rel="noreferrer" className="text-blue-600 text-sm">Job Link</a>
</div>
<div className="text-sm text-gray-500">{new Date(job.createdAt.seconds * 1000).toLocaleDateString()}</div>
</div>
<p className="text-sm mt-2">{job.notes}</p>
</div>
)}</Draggable>
))}
{provided.placeholder}
</div>
)}</Droppable>
))}
</DragDropContext>
</div>
)}

{/* Modal */}
{showModal && (
<div className="fixed inset-0 bg-black/30 flex items-center justify-center">
<div className="bg-white p-6 rounded w-full max-w-md">
<h3 className="text-lg font-semibold mb-4">Add Job</h3>
<form onSubmit={addJob}>
<label className="block mb-2">Company</label>
<input className="w-full p-2 border rounded mb-3" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required />
<label className="block mb-2">Role</label>
<input className="w-full p-2 border rounded mb-3" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required />
<label className="block mb-2">Link</label>
<input className="w-full p-2 border rounded mb-3" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} />
<label className="block mb-2">Notes</label>
<textarea className="w-full p-2 border rounded mb-3" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
<div className="flex gap-2 justify-end">
<button type="button" onClick={() => setShowModal(false)} className="px-4 py-2">Cancel</button>
<button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
</div>
</form>
</div>
</div>
)}


</div>
</div>
)
}