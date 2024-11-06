// This is the main page served on '/'. This file contains code to fetch current Active streams from Supabase.
import { createClient } from "@/utils/supabase/server";
import FetchStreams from "./(viewStream)/fetch-streams";
import Home from "./home";
export const revalidate = 0;
export default async function Index() {
  const supabase = createClient();
  const { data } = await supabase
  .from("streams")
  .select().eq('is_streaming', true);
  return (
    <>
      {/* <main className="flex-1 flex flex-row gap-6 px-4">
        <FetchStreams activeStreams={data ?? []} />
      </main> */}
      <main>
        <Home />
      </main>
    </>
  );
}