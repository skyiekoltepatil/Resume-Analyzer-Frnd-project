import mammoth from 'mammoth';
import pdfParse from 'pdf-parse';

/**
 * Server-only file text extraction for PDF, DOCX, and TXT files
 */
export async function extractTextFromFile(
  buffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<{ text: string; wordCount: number }> {
  let text = '';
  const ext = fileName.split('.').pop()?.toLowerCase();

  try {
    if (mimeType.includes('pdf') || ext === 'pdf') {
      const pdfData = await pdfParse(buffer);
      text = pdfData.text || '';
    } else if (
      mimeType.includes('word') ||
      mimeType.includes('officedocument') ||
      ext === 'docx'
    ) {
      const result = await mammoth.extractRawText({ buffer });
      text = result.value || '';
    } else if (mimeType.includes('text') || ext === 'txt') {
      text = buffer.toString('utf-8');
    } else {
      text = buffer.toString('utf-8');
    }
  } catch (err: any) {
    throw new Error(`Failed to extract text from ${fileName}: ${err.message}`);
  }

  // Normalize text whitespace
  text = text.replace(/\r\n/g, '\n').replace(/\t/g, ' ').trim();
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  if (wordCount < 10) {
    throw new Error('Extracted document contains too few words. Please ensure the file contains selectable text and is not an image scan.');
  }

  return { text, wordCount };
}
