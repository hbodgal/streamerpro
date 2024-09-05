// This file contains code for protected page. Requires Authentication and it containes code to Activate Stream and go live. Server actions called from this page is responsible to Send Emails to the subscribers.
"use client";
import { Button } from "@/components/ui/button";
import { getStreamingStatusAction, UpdateUserStreamingStatusAction } from "@/lib/streamActions";
import { useEffect, useState } from "react";

export default function StreamDashboard() {
    const [isStreaming, setIsStreaming] = useState(false);

    // On load, checks stream status and render UI based on that.
    useEffect(() => {
        const checkStreamingStatus = async () => {
            const status = await getStreamingStatusAction();
            setIsStreaming(status);
        };
        checkStreamingStatus();
    }, []);

    // On click, updates streaming status and it sends email to subscribers.
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsStreaming(!isStreaming);
        await UpdateUserStreamingStatusAction(!isStreaming);
    }
    return (
        <>
            <form>
                <Button onClick={handleClick}
                type="submit"
                className="flex align-middle justify-center">{ isStreaming ? 'End Streaming': 'Start Streaming' }</Button>
            </form>
        </>

    )
}