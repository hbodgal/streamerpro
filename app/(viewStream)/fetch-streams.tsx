"use client";
import VideoComponent from "@/components/ui/video";
import { createClient }  from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

type stream = {
    id: string;
    created_at: string;
    is_streaming: boolean;
    video_url: string;
}

export default function FetchStreams({ activeStreams }: {
    activeStreams: stream[];
}) {
    const supabase = createClient();
    const [liveStreams, setLiveSteams] = useState<stream[]>(activeStreams);
    useEffect(() => {
        const channel = supabase.channel('realtime-streams')
        .on('postgres_changes', {
            event: 'INSERT',
            schema:'public',
            table: 'streams',
            filter: 'is_streaming=eq.true'
        },
            payload => {
                // console.log(payload);
                setLiveSteams(prevStreams => [...prevStreams, payload.new as stream])
        })
        .subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <>
        {/* <h1>live streams</h1> */}
        {
            liveStreams.map((stream: stream) => (
              <Link 
              key={stream.id+stream.created_at} 
              href={`/${stream.id}`} 
              passHref 
              legacyBehavior
              className="block p-4 border rounded-lg shadow hover:bg-gray-100">
                <div className="cursor-pointer">
                <VideoComponent />
                </div>
              </Link>
            ))}
        </>
    )
}


// //               {/* <div>
// <h2 className="text-lg font-bold">{stream.title}</h2>
// <p className="text-sm text-gray-600">{stream.description}</p>
// </div> */}