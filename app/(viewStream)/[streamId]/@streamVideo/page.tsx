// This file contains FetchStream, FollowStream components that are responsible for rendering of live Video and Following Button to follow the channel.

import { createClient } from "@/utils/supabase/server";
import FetchStream from "./fetch-stream";
import { notFound } from "next/navigation";
import FollowStream from "./follow-stream";

export const revalidate = 0;
export default async function StreamVideo({ params }: {params: {
    streamId: string;
}}) {
    const streamId = params.streamId;
    if(streamId) {
        const supabase = createClient();
        const { data, error } = await supabase
        .from("streams")
            .select().match({ id: streamId }).single();
        if (error) {
            notFound();
        }
        return (
            <div>
                <div>
                    <FetchStream activeStream={data} />
                </div>
                <div className="mt-3">
                    <FollowStream streamId={streamId} />
                </div>
            </div>
          );
    }
}