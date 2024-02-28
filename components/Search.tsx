
import React, { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { sendMessage } from "@/lib/request";

export default ({ roomid }) => {
  const [search, setSearch] = useState('')
    const queryclient = useQueryClient();

    const mutation = useMutation((arg) => {
        return sendMessage(arg)
    }, {
        onSuccess : () => {
            queryclient.invalidateQueries('messages')
        }
    })

    function onSubmit(e:any){
        e.preventDefault();
        mutation.mutate({ roomid, message: search });
        setSearch('')
    }

    if(mutation.isLoading) return <div className="text-center text-gray-50">Loading...</div>
    if(mutation.isError) return <div className="text-center text-gray-50"> Error : {mutation.error.message}</div>

  return (
    <div className="fixed bottom-0 left-0 w-full z-0 h-40 text-gray-50 bg-gray-700">
      <div className="grid grid-cols-6 absolute bottom-10 w-full">
        <div className="col-start-2 col-span-6 ">
          <form
            onSubmit={onSubmit}
            className="flex justify-center items-center"
          >
            <input
              className="w-[80%] p-3 rounded-md text-gray-800"
              placeholder="Type your question here.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="p-2 m-2 border-2 rounded-lg border-gray-600 hover:bg-green-800"
              type="submit"
              
              >
              Enter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
