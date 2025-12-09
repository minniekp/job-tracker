import React from 'react'
import { Droppable, Draggable } from '@hello-pangea/dnd'


export default function StatusColumn({ status, jobs }) {
return (
<Droppable droppableId={status}>
{(provided) => (
<div ref={provided.innerRef} {...provided.droppableProps} className="bg-white p-4 rounded shadow min-h-[300px]">
<h3 className="font-semibold mb-2">{status}</h3>


{jobs.map((job, index) => (
<Draggable key={job.id} draggableId={job.id} index={index}>
{(provided) => (
<div
ref={provided.innerRef}
{...provided.draggableProps}
{...provided.dragHandleProps}
className="p-3 mb-3 border rounded bg-gray-50"
>
<div className="font-semibold">{job.company} — {job.role}</div>
</div>
)}
</Draggable>
))}


{provided.placeholder}
</div>
)}
</Droppable>
)
}