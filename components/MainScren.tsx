
import React from "react";
import AskScreen from "./Ask";
import ResponseScreen from "./Responses";
import SearchScreen from "./Search";
import Loading from "./Loading";
import Notfound from "./Notfound";
import { getMessages } from "@/lib/request";
import { useQuery } from "react-query";
export default function MainScren({roomid}) {
  const {
    isLoading,
    isError,
    data: messages,
    error,
} = useQuery(["messages", roomid], () => getMessages(roomid));

if (isLoading) return <Loading></Loading>;
if (isError) return <div className="text-center">Error: {error.message} 0_0</div>;
if (!messages || messages.length === 0) return <Notfound />;

  return (
    <div className="container mx-auto w-4/5 py-5">
      {/* here we ask the question */}
      {messages &&
        messages.map((message:any, index:any) => {
          return (
            <div key={index}>
              <AskScreen q={message.question} />
              {/* Response screen */}
              <ResponseScreen ans={message.answer} />
            </div>
          );
        })}
    </div>
  );
}
