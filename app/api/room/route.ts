import { NextResponse } from "next/server";
import connectDB from "@/database/conn";
import { getAllRooms, createRoom } from "@/controller/room.controller";

export async function GET(request: Response) {
  connectDB().catch((err) =>
    NextResponse.json({ error: "Database connection error" })
  );
  // await connectDB();
  const getRooms = await getAllRooms(request);
  return getRooms;
}
export async function POST(request: Response) {
  connectDB().catch((err) => request.json());
  // await connectDB();
  const creatRoom = await createRoom(request);
  return NextResponse.json({ creatRoom });
}
