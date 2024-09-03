"use client";
import VideoComponent from "@/components/ui/video";
import { createClient }  from "@/utils/supabase/client";
import { useEffect, useState } from "react";

type stream = {
    id: string;
    created_at: string;
    is_streaming: boolean;
    video_url: string;
}

export default function FetchPost({ activeStream }: {
    activeStream: stream;
}) {
    const supabase = createClient();
    const [liveStream, setLiveSteam] = useState<stream>(activeStream);
    useEffect(() => {
        const channel = supabase.channel('realtime-streams')
        .on('postgres_changes', {
            event: 'UPDATE',
            schema:'public',
            table: 'streams',
            filter: `id=eq.${activeStream.id}`
        },
            payload => {
                setLiveSteam(payload.new as stream);
        })
        .subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, [liveStream, activeStream, setLiveSteam]);
    return (
        <>
            <div className="cursor-pointer">
            <iframe src="https://www.youtube.com/embed/jfKfPfyJRdk?si=bJfKEj1OuJa1MJ-U&autoplay=1" className="aspect-video w-full" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
        </>
    )
}