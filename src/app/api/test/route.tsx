export function POST(): Response {
    const object = { text: 'POST response' };
    return new Response(JSON.stringify(object), {
        headers: { 'Content-Type': 'application/json' },
    });
}

export function GET(): Response {
    return new Response('GET response');
}
