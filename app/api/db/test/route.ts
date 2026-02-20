import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET() {
  try {
    const start = Date.now();
    const { error } = await supabase.from('plans').select('id').limit(1);
    const latencyMs = Date.now() - start;

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 503 }
      );
    }

    return NextResponse.json({
      ok: true,
      database: 'connected',
      latencyMs,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}
