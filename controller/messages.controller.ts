import { NextResponse } from "next/server";
// import { Configuration, OpenAIApi } from "openai";
import OpenAI from "openai";

import Message from "@/models/message.model";
import Room from "@/models/room.model";
import ENV from "../config.env";
export async function getChat(request: Response, context: any) {
  const { params } = context;
  try {
    const { chatId } = params;
    if (!chatId) return NextResponse.json({ error: "No room with this id" });
    // const messages = await Messaage.findById(chatId);
    const messages = await Message.find({ room: chatId }, { __v: 0, room: 0 });

    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return NextResponse.json({ error, message: "Faile to fetch message" });
  }
}

export async function createChat(request: Response, context: any) {
  const { params } = context;
  const { question, amswer } = await request.json();
  // const room = await Room.findById(params?.chatId);
  const rooms = await Room.findOne({ _id: params.chatId });
  if (!rooms)
    return NextResponse.json({ error: "room with this id not found" });
  if (!question && !amswer)
    return NextResponse.json({ error: "No question and answer found" });
  // specify data based on message model
  /** CONFIG OPEN AI API */
  const openai = new OpenAI({
    apiKey: ENV.OPENAI_API_KEY,
  });

  // const openai = new OpenAI(config);

  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: question,
    temperature: 0.5,
    max_tokens: 100,
    top_p: 1,
  });

  /** specify data to the message model */
  const message = new Message({
    question,
    answer: completion.choices[0].text,
    room: params?.chatId,
  });
  //   const message = new Messaage({
  //     question: "what is chat gpt",
  //     answer: "ChatGpt is a chatbot",
  //     room: params?.chatId,
  //   });
  //    now we can save the data to db
  await message.save();

  rooms.messages.push(message._id);
  //  save data at room model

  await rooms.save();
  return NextResponse.json({ success: true, data: message });
}
