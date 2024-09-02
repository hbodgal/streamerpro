// export const fetchCache = "default-cache";
// this page will be displayed at main.tsx. All stream cards will be displayed on main page.


import { notFound } from "next/navigation"
export default async function viewStream({ params }: {params: {
    streamId: string;
}}) {
    // connect this with backend to check available stream ID
    // if(params.streamId) {
    //     notFound();
    // }
    type User = {
        id: number;
        name: string;
        username: string;
        email: string;
        phone: string;
    }
    // const response = await fetch("URL", {
    //     cache: "no-store",
    //     next: {
    //         revalidate: 10,
    //     },
    // })
    // place urls that needs to be cached above urls that are not be cached
    // if you set route segment configuration than no need to maintain order.
    // const activeStreams = await response.json();
    return (
    <h1>Stream {params.streamId}</h1>
    )
}