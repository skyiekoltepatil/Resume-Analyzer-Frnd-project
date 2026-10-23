import { NextRequest, NextResponse } from 'next/server';
import { matchJobWithGemini } from '@/lib/gemini';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { resumeText, jobTitle, jobDescription, company } = body as {
      resumeText: string;
      jobTitle: string;
      jobDescription: string;
      company?: string;
    };

    if (!resumeText || resumeText.trim().length < 20) {
      return NextResponse.json({
        success: false,
        error: 'Resume text is required to calculate job match.'
      }, { status: 400 });
    }

    if (!jobDescription || jobDescription.trim().length < 20) {
      return NextResponse.json({
        success: false,
        error: 'A valid job description is required for matching.'
      }, { status: 400 });
    }

    const matchReport = await matchJobWithGemini(
      resumeText,
      jobTitle || 'Target Role',
      jobDescription,
      company || 'Target Organization'
    );

    return NextResponse.json({
      success: true,
      match: matchReport,
    });
  } catch (err: any) {
    console.error('[API /api/ai/match-job] Error:', err);
    return NextResponse.json({
      success: false,
      error: err?.message || 'Failed to analyze job match.',
    }, { status: 500 });
  }
}
