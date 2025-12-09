import React from 'react'


export default function JobCard({ job }) {
return (
<div className="p-3 mb-3 border rounded shadow-sm bg-white">
<div className="font-semibold">{job.company} — {job.role}</div>
{job.link && (
<a href={job.link} target="_blank" rel="noreferrer" className="text-blue-600 text-sm">
Job Link
</a>
)}
<p className="text-sm mt-2">{job.notes}</p>
</div>
)
}