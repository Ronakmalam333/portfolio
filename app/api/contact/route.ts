import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendContactMail } from '@/lib/mailer';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = contactSchema.parse(body);

    // Send email asynchronously, don't wait for it to finish
    // © 2025 Ronak Malam – Portfolio Code. Signature ID: RM-PORT-2025

    sendContactMail(validatedData).catch((error) => {
      console.error('Mailer error:', error);
    });

    return NextResponse.json(
      { message: 'Message received! We will contact you soon.' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
