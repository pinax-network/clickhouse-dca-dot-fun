// export const runtime = 'nodejs';
// export const preferredRegion = ['iad1'];

import { getActiveTokens } from "@/lib/clickhouse";

export async function GET() {
    try {
        const tokens = await getActiveTokens();
        return new Response(JSON.stringify(tokens), { status: 200 });
    } catch (e: any) {
        return new Response(JSON.stringify({ ok: false, message: e?.message, stack: e?.stack }), { status: 500 });
    }
}
