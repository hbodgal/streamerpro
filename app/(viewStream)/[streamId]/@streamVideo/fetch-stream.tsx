// This file contains code to fetch live stream using Server Actions
"use client";
import { createClient }  from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { redirectUserToHomeAction } from "@/lib/authActions";

type stream = {
    id: string;
    user_id: string;
    created_at: string;
    is_streaming: boolean;
    video_url: string;
}

export default function FetchStream({ activeStream }: {
    activeStream: stream;
}) {
    const supabase = createClient();
    const [liveStream, setLiveSteam] = useState<stream>(activeStream);

    // Subscribes to the realtime update on Active Streams
    // checks stream is Active and valid
    // If streamer turns stream off, this subscription redirects user back home
    useEffect(() => {
        const channel = supabase.channel('realtime-streams')
        .on('postgres_changes', {
            event: 'INSERT',
            schema:'public',
            table: 'streams',
            filter: `id=eq.${activeStream.id}`
        },
            payload => {
                setLiveSteam(payload.new as stream);
            })
        .on('postgres_changes', {
            event: 'DELETE',
            schema:'public',
            table: 'streams'
        },
            payload => {
                if (payload.old.id === activeStream.id) {
                    redirectUserToHomeAction();
                }
            })
        .subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, [liveStream, activeStream, setLiveSteam, supabase]);
    return (
        <>
            {/* This Iframe is obtained from youtube to embed and is set on Autoplay */}
            <div className="cursor-pointer">
                <iframe src="https://www.youtube.com/embed/jfKfPfyJRdk?si=bJfKEj1OuJa1MJ-U&autoplay=1" className="aspect-video w-full" allowFullScreen></iframe>
            </div>
        </>
    )
}