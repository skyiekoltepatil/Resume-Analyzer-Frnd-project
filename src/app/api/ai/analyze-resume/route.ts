import { NextRequest, NextResponse } from 'next/server';
import { analyzeResumeWithGemini } from '@/lib/gemini';
import { ExtractedProfile } from '@/lib/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { profile, targetRole } = body as { profile: ExtractedProfile; targetRole?: string };

    if (!profile || !profile.rawText || profile.rawText.trim().length < 20) {
      return NextResponse.json({
        success: false,
        error: 'Invalid resume profile or missing resume text.'
      }, { status: 400 });
    }

    const report = await analyzeResumeWithGemini(profile, targetRole || 'Software Professional');

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (err: any) {
    console.error('[API /api/ai/analyze-resume] Error:', err);
    return NextResponse.json({
      success: false,
      error: err?.message || 'Failed to complete resume analysis.',
    }, { status: 500 });
  }
}
