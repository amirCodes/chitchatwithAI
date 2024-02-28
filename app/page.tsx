"use client";
import React, { useState } from "react";
import { Suspense } from "react";
import Aside from "@/components/Aside";
import Image from "next/image";
import MainScren from "@/components/MainScren";
import { useQuery } from "react-query";
import { getAllRooms } from "../lib/request";
import Loading from "@/components/Loading";
import SearchScreen from "@/components/Search";
import Banner from "@/components/Banner";


export default function Home() {
  const [roomid, setRoomid]: any = useState(null);
  const { isLoading, isError, data, error } = useQuery("rooms", getAllRooms);

  if (isLoading) return <Loading />;
  if (isError)
    return <div className="text-center">Error : {error.message}</div>;
  if (!data) return <div className="text-center">No Messages</div>;
  // console.log("*******************************")
  // console.log(roomid)
  // console.log("*******************************")
    
  function onRoomClick(roomid: any) {
 
    data.filter((room: { _id: any }) => {
      if (room._id === roomid) {
        setRoomid(roomid);
      }
    });
  }
  return (
    <main className="grid grid-cols-6">
      <div className="bg-gray-900 col-span-1 aside text-gray-50 z-10 min-h-screen">
        {data && <Aside getRooms={data} handler={onRoomClick}></Aside>}
      </div>
      <div className=" bg-gray-800 col-span-5  text-gray-50  mb-40">
        <Suspense fallback={<p>Loading feed...</p>}>
          {
          roomid ? <MainScren roomid={roomid}></MainScren> : <Banner />
        }
        </Suspense>
     
        {
          roomid && <SearchScreen roomid={roomid}></SearchScreen>
        }  
      </div>
    </main>
  );
}
