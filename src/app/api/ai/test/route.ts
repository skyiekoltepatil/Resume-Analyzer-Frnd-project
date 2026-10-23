import { NextResponse } from 'next/server';
import { testGeminiConnection } from '@/lib/gemini';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const diagnostic = await testGeminiConnection();
    return NextResponse.json({
      success: true,
      diagnostic,
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err?.message || 'Failed to execute diagnostic.',
    }, { status: 500 });
  }
}
