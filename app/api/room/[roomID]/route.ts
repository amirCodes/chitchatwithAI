import { NextResponse } from "next/server";
import { deleteRoom, getRoom } from "@/controller/room.controller";
import connectDB from "@/database/conn";

export async function GET(request: Response, context: any) {
    connectDB().catch((err) =>
    NextResponse.json({ error: "Database connection error" })
  );
    // await connectDB();
    const getroom = await getRoom(request, context);
    return getroom
  }
  export async function DELETE(request: Response, context: any) {
    const deleteroom = await deleteRoom(request, context);
    return deleteroom;
    
  }