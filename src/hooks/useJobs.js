import { useEffect, useState } from 'react'
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'
import { db } from '../services/firebase'


export default function useJobs() {
const [jobs, setJobs] = useState([])
const [loading, setLoading] = useState(true)


useEffect(() => {
const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'))
const unsub = onSnapshot(q, snapshot => {
setJobs(snapshot.docs.map(d => ({ id: d.id, ...d.data() })))
setLoading(false)
})
return unsub
}, [])


return { jobs, loading }
}