// This file contains code to fetch all the active streams from Supabase and render on the screen. It also, watches live updates of the new added stream and updates.

"use client";
import VideoComponent from "@/components/ui/video";
import { createClient }  from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

type stream = {
    id: string;
    user_id: string;
    created_at: string;
    is_streaming: boolean;
    video_url: string;
}

export default function FetchStreams({ activeStreams }: {
    activeStreams: stream[];
}) {
    const supabase = createClient();
    const [liveStreams, setLiveSteams] = useState<stream[]>(activeStreams);

    const handleStreamListUpdates = async () => {
        const supabase = createClient();
        const { data } = await supabase
            .from("streams")
            .select().eq('is_streaming', true);
        setLiveSteams(data ?? []);

    }
    useEffect(() => {
        const channel = supabase.channel('realtime-streams')
        .on('postgres_changes', {
            event: '*',
            schema:'public',
            table: 'streams',
            filter: 'is_streaming=eq.true'
        },
            payload => {
                handleStreamListUpdates();
        })
        .subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, [activeStreams, liveStreams, setLiveSteams ]);

    return (
        <>
        {
            liveStreams.map((stream: stream) => (
              <Link 
              key={stream.id+stream.created_at} 
              href={`/${stream.user_id}`} 
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
