import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pathwise — AI Career Intelligence & Explainable Resume Analytics',
  description: 'Evidence-based resume analysis, explainable ATS compatibility scoring, Google XYZ bullet optimization, and verified job matching powered by Google Gemini and deterministic heuristics.',
  keywords: ['Resume Analyzer', 'AI Career Intelligence', 'ATS Score', 'Job Matcher', 'Google XYZ Resume', 'Career Roadmap'],
  authors: [{ name: 'Pathwise AI Team' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F9F9F6' },
    { media: '(prefers-color-scheme: dark)', color: '#0C2016' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#F9F9F6] text-forest-950 font-sans selection:bg-limeAccent-200 selection:text-forest-950">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
