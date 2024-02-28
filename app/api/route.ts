import { NextResponse } from "next/server";
import connectDB from "@/database/conn"
export async function GET(request: Request) {
connectDB().catch((err) => request.json())
// await connectDB();
return NextResponse.json({ name: 'amir'})
}