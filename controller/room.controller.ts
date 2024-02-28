import { NextResponse } from "next/server";
import Room from "@/models/room.model"
export async function getRoom(request: Response, context: any) {
    let {params}= context;
    const roomID =params.roomID
    try {
        if(!roomID) {return NextResponse.json({status: "ID cannot be found"})}
        // const room = await Room.findById(roomID)
           const room = await Room.findById(roomID).populate('messages')
        if(!room){ return NextResponse.json({status: "there is no room with this id"})}
        return NextResponse.json({success: true, data: room})
    } catch (error) {
        return NextResponse.json({error})
    }
}
export async function deleteRoom(request: Response, context: any) {
    let {params}= context;
    const roomID =params.roomID
    try {
        if(!roomID) {return NextResponse.json({status: "ID cannot be found"})}
        const room = await Room.findByIdAndDelete(roomID)
        if(!room){ return NextResponse.json({status: "there is no room with this id"})}
        return NextResponse.json({success: true, message: "room deleted successfully"})
    } catch (error) {
        return NextResponse.json({error})
    }
}
export async function getAllRooms(request: Response) {
    
    try {
        const rooms = await Room.find({})
        return NextResponse.json({success: true, data: rooms})
    } catch (error) {
        return NextResponse.json({error})
    }
}

export async function createRoom(request: Response) {
    // const data = await request.json();
    // try {
        
    //     const len = await (await Room.find({})).length;

    //     const defaultRoom = {
    //         name : `Room ${len + 1}`,
    //         messages: []
    //     }

    //     const chat = await Room.create(defaultRoom);
    //     return NextResponse.json({ success: true, data: chat })

    // } catch (error) {
    //     return NextResponse.json({ error })
    // }
    try {
        
        const len = await (await Room.find({})).length;

        const defaultRoom = {
            name : `Chai Khana ${len + 1}`,
            messages: []
        }

        const chat = await Room.create(defaultRoom);
        return NextResponse.json({ success: true, data: chat })

    } catch (error) {
        return NextResponse.json({ error })
    }
    
} 