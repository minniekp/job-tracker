export function formatDate(date) {
if (!date) return ''
return new Date(date.seconds * 1000).toLocaleDateString()
}