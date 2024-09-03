import { createClient } from "@/utils/supabase/server";
import FetchStreams from "./(viewStream)/fetch-streams";
export const revalidate = 0;
export default async function Index() {
  const supabase = createClient();
  const { data } = await supabase.from("streams").select();
  return (
    <>
      <main className="flex-1 flex flex-row gap-6 px-4">
        <FetchStreams activeStreams={data ?? []} />
      </main>
    </>
  );
}