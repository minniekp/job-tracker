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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
<Navbar />
<div className="container mx-auto p-8">
<div className="flex justify-between items-center mb-8">
<div>
<h2 className="text-3xl font-bold text-gray-800">Job Board</h2>
<p className="text-gray-600 mt-1">Manage your applications</p>
</div>
<button onClick={() => setShowModal(true)} className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition duration-200">+ Add Job</button>
</div>

{loading ? <div className="flex justify-center items-center py-20"><div className="text-gray-600 text-lg">Loading...</div></div> : (
<div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<DragDropContext onDragEnd={onDragEnd}>
{STATUSES.map(status => (
<Droppable droppableId={status} key={status}>
{(provided, snapshot) => (
<div ref={provided.innerRef} {...provided.droppableProps} className={`bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-lg min-h-[400px] border-2 transition-all ${snapshot.isDraggingOver ? 'border-blue-400 bg-blue-50/50' : 'border-gray-200'}`}>
<h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
{status === 'Applied' && '📝'}
{status === 'Interview' && '💼'}
{status === 'Offer' && '🎉'}
{status === 'Rejected' && '❌'}
{status}
</h3>
{jobs.filter(j => j.status === status).map((job, index) => (
<Draggable key={job.id} draggableId={job.id} index={index}>
{(provided, snapshot) => (
<div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className={`p-4 mb-3 bg-white border-2 rounded-xl shadow-md hover:shadow-lg transition-all cursor-grab active:cursor-grabbing ${snapshot.isDragging ? 'shadow-2xl ring-2 ring-blue-400 rotate-2' : 'border-gray-200'}`}>
<div className="flex justify-between items-start mb-2">
<div className="flex-1">
<div className="font-bold text-gray-800 mb-1">{job.company}</div>
<div className="text-sm text-gray-600 mb-2">{job.role}</div>
{job.link && <a href={job.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline">🔗 View Job</a>}
</div>
<div className="text-xs text-gray-400 whitespace-nowrap ml-2">{new Date(job.createdAt.seconds * 1000).toLocaleDateString()}</div>
</div>
{job.notes && <p className="text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100">{job.notes}</p>}
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
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
<div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl border border-gray-100" onClick={e => e.stopPropagation()}>
<h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Job</h3>
<form onSubmit={addJob}>
<label className="block mb-2 text-sm font-medium text-gray-700">Company</label>
<input className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required placeholder="e.g. Google" />
<label className="block mb-2 text-sm font-medium text-gray-700">Role</label>
<input className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} required placeholder="e.g. Software Engineer" />
<label className="block mb-2 text-sm font-medium text-gray-700">Job Link</label>
<input className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition" value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="https://..." />
<label className="block mb-2 text-sm font-medium text-gray-700">Notes</label>
<textarea className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none" rows="3" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Any additional notes..." />
<div className="flex gap-3 justify-end">
<button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition">Cancel</button>
<button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition shadow-lg hover:shadow-xl">Add Job</button>
</div>
</form>
</div>
</div>
)}


</div>
</div>
)
}