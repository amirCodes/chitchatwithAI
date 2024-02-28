import { NextResponse } from "next/server"

const dataFromDB = [
    {
        id: 1,
        name: 'sabera'
    },
    {
        id: 2,
        name: 'samera'
    },
    {
        id: 3,
        name: 'sara'
    },
    {
        id: 4,
        name: 'hazira'
    }
]
export async function GET(request: Request, context: any) {
    const { params } = context
     const data = dataFromDB.filter((x:any )=> params.userid == x.id.toString() )

     return NextResponse.json({
        data
     })
} 