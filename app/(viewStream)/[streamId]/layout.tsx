import { Suspense } from "react";

export default function ProductDetailsLayout ({
    // children,
    streamVideo,
    chatbox

}: {
    // children: React.ReactNode,
    streamVideo: React.ReactNode,
    chatbox: React.ReactNode,

}) {
    return (
        <div>
            {/* { children } */}
            <div className="flex flex-row items-stretch">
            <Suspense fallback={<div>Loading video...</div>}>
                <div className="flex-[4] bg-gray-200 p-4">
                    {streamVideo}
                </div>
            </Suspense>
            <Suspense fallback={<div>Loading chat...</div>}>
            <div className="flex-[1] bg-gray-200 p-4">
            {chatbox}
            </div>
            </Suspense>
        </div>

            {/* <footer>Footer with childeren name</footer> */}
        </div>
    )
}