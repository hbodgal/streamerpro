import { notFound } from "next/navigation"
export default function streamDashboard({ params }: {params: {
    streamId: string;
}}) {
    // connect this with backend to check available stream ID
    // if(params.streamId) {
    //     notFound();
    // }
    return <h1>Stream {params.streamId}</h1>

    // button which activates streaming for the user.
}