import { createClient } from "@/utils/supabase/server";
import FetchPost from "./fetch-stream";
import { notFound } from "next/navigation";
type stream = {
    id: string;
    created_at: string;
    is_streaming: boolean;
    video_url: string;
}
export const revalidate = 0;

export default async function StreamVideo({ params }: {params: {
    streamId: string;
}}) {
    const streamId = params.streamId;
    console.log('streamId:',streamId);

    if(streamId) {
        const supabase = createClient();
        const { data } = await supabase
        .from("streams")
        .select().match({id: streamId}).single();
        //   console.log(stream);
        // if(!data) {
        //   notFound();
        // }
        return (
            <>
                <FetchPost activeStream={data} />
            </>
          );
    }
}