export default async function Copy(data) {
	if ('clipboard' in navigator) {
		await navigator.clipboard.writeText(data);
	} else {
		document.execCommand('copy', true, data);
	}
}