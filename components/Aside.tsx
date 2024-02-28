
import React from "react";
import {
  PencilIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { createRoom, deleteRoom } from "@/lib/request";
import { useQuery, useMutation, useQueryClient } from "react-query";


export default function Asside({ getRooms, handler }) {
  const queryclient = useQueryClient();
  /** create new room */
  const createMutation = useMutation(createRoom, {
    onSuccess: () => {
      queryclient.invalidateQueries("rooms");
    },
  });

  /** delete room */
  const deleteMutation = useMutation(deleteRoom, {
    onSuccess: () => {
      queryclient.invalidateQueries("rooms");
    },
  });

  // console.log("----------------asside-------------------");
  // console.log(getRooms);
  return (
    <div className=" left-0 w-auto">
      <div className="text-gray-50 flex flex-col justify-between py-4">
        <button
          className="flex flex-row text-center ml-3 p-2 border rounded-md border-1 border-gray-400 w-[90%] hover:bg-blue-600"
          onClick={() => {
            createMutation.mutate();
        }}
        >
          New Chat <PencilSquareIcon className="h-6 w-6 ml-2" />
        </button>
        <div className="flex flex-col gap-4 p-3 ">
          {getRooms &&
            getRooms.map((room: any, index:any) => {
              return(
                <div
                key={index}
                className="flex flex-row border-0 rounded-md bg-gray-600 py-1 px-3"
              >
                <button
                  className="text-left truncate w-full active:bg-violet-700"
                  onClick={() => handler(room._id)}
                >
                  <span className="block  py-3 text-gray-50">
                    {/* <PencilIcon className="w-4 h-4"></PencilIcon> */}
                    {room.name || "Chat Name Here"}
                  </span>
                </button>

                <button
                  className="p-2 hover:text-red-400"
                  title="delete chat"
                  onClick={() => deleteMutation.mutate(room._id)}
                >
                  <TrashIcon className="w-4 h-4"></TrashIcon>
                </button>
              </div>
              )
            })}
        </div>
      </div>
    </div>
  );
}
