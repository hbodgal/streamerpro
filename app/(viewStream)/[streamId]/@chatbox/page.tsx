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
            <div className="max-w-3xl mx-auto h-full">
                <div className="border-rounded-md">
                    <div className="h-10">
                        <div className="p-2 border-b flex items-center justify-between">
                            <h1 className="text-xl">Chat</h1>
                        </div>
                    </div>
                    <FetchMessages activeStreamId={streamId} latestMessages={data ?? []} />
                </div>
            </div>
        )
    }