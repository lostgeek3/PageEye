import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      const response = NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
      return response;
    }

    const user = await prisma.user.create({
      data: {
        username: name,
        email: email,
        nickname: '11'
      },
    });

    const response = NextResponse.json(user, { status: 201 });
    return response;
  } catch (error) {
    console.error('Error creating user:', error);
    const response = NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    return response;
  }
}
