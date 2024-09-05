import { createClient } from "@/utils/supabase/client";
import FetchMessages from "./fetch-messages";
import { notFound } from "next/navigation";

// This file contains code for Chatbox.
export default async function ChatBox({ params }: { params: { streamId: string } }) {
    const streamId = params.streamId;
    const supabase = createClient();
    const { data, error } = await supabase
        .from("messages")
        .select().match({ stream_id: streamId });
    if (error) {
        notFound();
    }
        return (
            <FetchMessages activeStreamId={streamId} latestMessages={data ?? []} />
        )
    }