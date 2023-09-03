import { connectDB } from '@/app/config/connectDB';
import User from '@/app/model/user';
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: NextApiResponse) {
  const body = await req.json();
  const { text } = body;
  if (!text) {
    throw new Error('Fill all fields');
  }
  connectDB();
  const newTodo = await User.create({
    title: text,
  });

  return NextResponse.json(newTodo);
}

export async function GET() {
  connectDB();
  const data = await User.find();
  return NextResponse.json(data, { status: 200 });
}
