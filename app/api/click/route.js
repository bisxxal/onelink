import ConnectDb from "@/lib/connect";
import { Event } from "@/models/Event";
import { NextResponse } from "next/server";

ConnectDb()
export async function POST(req) {
    
    const url = new URL(req.url);
    const clickedLink = atob(url.searchParams.get('url'));
    const page = url.searchParams.get('page');
    console.log("page is",page," aedskeuhfckls;vnd");
    await Event.create({type:'click', uri:clickedLink , page:page});
    return NextResponse.json({ success: true})
}   