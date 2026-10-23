import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromFile } from '@/lib/server-parser';
import { parseResumeProfile } from '@/lib/resume-parser';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const manualText = formData.get('manualText') as string | null;

    if (manualText && manualText.trim().length > 20) {
      const profile = parseResumeProfile(manualText.trim(), 'Pasted_Resume.txt', 'text/plain');
      return NextResponse.json({ success: true, profile });
    }

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file or text was uploaded.' }, { status: 400 });
    }

    // Size limit 5MB
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: 'File size exceeds maximum allowed limit of 5MB.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const { text, wordCount } = await extractTextFromFile(buffer, file.name, file.type);

    const profile = parseResumeProfile(text, file.name, file.type || 'application/octet-stream');
    profile.wordCount = wordCount;

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (err: any) {
    console.error('[API /api/resume/parse] Error parsing file:', err);
    return NextResponse.json({
      success: false,
      error: err?.message || 'Failed to parse resume document.',
    }, { status: 500 });
  }
}
