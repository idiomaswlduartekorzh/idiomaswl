import { generateCourseTermsPdf } from '@/lib/course-pricing/terms-pdf.server';

export const runtime = 'nodejs';

export async function GET() {
  const pdf = await generateCourseTermsPdf();
  return new Response(pdf.bytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${pdf.filename}"`,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
