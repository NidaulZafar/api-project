export async function requestData(url) {
    const response = await fetch(url);
    if (response.ok) {
        return response.json();
    } 
    throw new Error(`HTTP Error happened: ${response.stat} ${response.statusText}`);
}