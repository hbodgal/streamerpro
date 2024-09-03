import { createClient } from "@/utils/supabase/server";
import FetchStreams from "./fetch-streams";

export const revalidate = 0;
export default async function ViewStreams() {
    const supabase = createClient();
    const { data } = await supabase.from("streams").select();
    return <FetchStreams activeStreams={data ?? []} />
}