import { getChat, createChat } from "@/controller/messages.controller";
import Room from "@/models/room.model";
import { NextResponse } from "next/server";
export async function GET(request: Response, context: any) {
  const chatroom = await getChat(request, context);
  return chatroom;
}

export async function POST(request: Response, context: any) {
  // const { params} = context
  // const id= params.chatId
  // console.log('router :'+params.chatId)
  // const room = await Room.findById(params?.id)
  // if(!room) return NextResponse.json({error: "room with this id not found"})

  const creatNewChat = await createChat(request, context);
  return creatNewChat;
}
