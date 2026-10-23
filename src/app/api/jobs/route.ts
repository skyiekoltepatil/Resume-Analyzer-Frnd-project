import { NextRequest, NextResponse } from 'next/server';
import { getJobs } from '@/lib/job-data';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || undefined;
    const role = searchParams.get('role') || undefined;
    const company = searchParams.get('company') || undefined;

    const result = await getJobs(q, role, company);

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (err: any) {
    console.error('[API /api/jobs] Error:', err);
    return NextResponse.json({
      success: false,
      error: err?.message || 'Failed to retrieve jobs.',
    }, { status: 500 });
  }
}
