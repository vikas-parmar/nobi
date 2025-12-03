import { NextRequest, NextResponse } from 'next/server';
import { extractText, chunkText } from '@/lib/file-extractor';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileType = file.name.endsWith('.pdf') ? 'pdf' : 'docx';

        const text = await extractText(buffer, fileType);
        console.log('text', text)
        const chunks = chunkText(text);

        return NextResponse.json({ chunks, filename: file.name, fileType });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Failed to process file' }, { status: 500 });
    }
}
