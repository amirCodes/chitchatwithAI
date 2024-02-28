import React from "react";
import Image from 'next/image'
import Profile from "/public/chatgpt_logo.webp"
export default function ResponseScreen({ ans }) {
  return (
    <div className="grid grid-cols-12 items-center rounded-md bg-gray-600 p-1 py-4">
      <div className="icon col-span-1 bg-green-500 mr-auto rounded-full p-[1%]">
        <Image src={Profile} className=" rounded-full bg-rgb(25, 195, 125)" width={50} height={50} alt="logo" />
      </div>
      <div className="question col-span-11 px-4 flex-col justify-center">
        <span className="text-lg">
           {ans}
        </span>
      </div>
    </div>
  );
}
