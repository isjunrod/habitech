'use server'

export async function fetchProxiedImage(imageUrl: string) {

    console.log('Server Action called for:', imageUrl);

    try {
        const response = await fetch(imageUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        const contentType = response.headers.get('Content-Type') || 'image/jpeg';

        return `data:${contentType};base64,${base64}`;
    } catch (error) {
        console.error('Server Action error:', error);
        throw error;
    }
}