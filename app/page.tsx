// import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
// import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
// import { hasEnvVars } from "@/utils/supabase/check-env-vars";
// import streamDashboard from "./viewStream/page";
import Link from "next/link";
export default async function Index() {
  const streamId = 'default';

  // it will be fetched from API
  const streamData = [
    { streamId: 'stream1', title: 'Stream 1', description: 'View Stream 1' },
    { streamId: 'stream2', title: 'Stream 2', description: 'View Stream 2' },
    { streamId: 'stream3', title: 'Stream 3', description: 'View Stream 3' },
  ];
  return (
    <>
      <main className="flex-1 flex flex-row gap-6 px-4">
          {/* <streamDashboard /> */}
          {/* THis links will be cards of active stream. Onclick it will redirect to steam page. */}
          {
            streamData.map((stream) => (
              <Link 
              key="stream.streamId" 
              href={`/${stream.streamId}`} 
              replace
              className="block p-4 border rounded-lg shadow hover:bg-gray-100">
              <div>
                <h2 className="text-lg font-bold">{stream.title}</h2>
                <p className="text-sm text-gray-600">{stream.description}</p>
              </div>
              </Link>
            ))}
      </main>
    </>
  );
}
