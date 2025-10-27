// export const runtime = 'nodejs';
// export const preferredRegion = ['iad1'];

export async function GET() {
    try {
        const res = await fetch('https://dca.hosted.service.dev.pinax.network/ping', {
            // give it a bit more time while testing
            // @ts-expect-error: types may lag, but works on Node 18+/undici
            timeout: 15000,
        });
        const text = await res.text();
        return new Response(JSON.stringify({ ok: true, status: res.status, body: text }), { status: 200 });
    } catch (e: any) {
        return new Response(JSON.stringify({ ok: false, message: e?.message, stack: e?.stack }), { status: 500 });
    }
}
