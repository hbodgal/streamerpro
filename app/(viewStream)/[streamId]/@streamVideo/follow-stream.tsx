// This file contains code to handle Follow Channel Features. Checks Authentication on click, on load and renders Button status accordingly.
"use client";
import { Button } from "@/components/ui/button";
import { checkFollowStatus, toggleFollow } from "@/lib/streamActions";
import { useEffect, useState } from "react";
import { checkAuthenticationAction, getUserAction } from "@/lib/authActions";

type stream = {
    id: string;
    user_id: string;
    created_at: string;
    is_streaming: boolean;
    video_url: string;
}
export default function FollowStream({ activeStream }: { activeStream: stream }) {
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>('');

    // checks Authentication on load
    // checks if Active users follows the active stream on load
    // sets following status 
    useEffect(() => {
        const checkAuthentication = async () => {
            const user = await getUserAction();
            if (user) {
                setUserId(user.user.id);
                const status = await checkFollowStatus(user.user.id, activeStream.user_id);
                setIsFollowing(status);
            }
        };
        checkAuthentication();
    }, []);

    // On click checks authentication
    // This Server Action will Automatically redirect user if authentication check fails
    // updates follow status
    const handleClick = async () => {
        const user = await checkAuthenticationAction();
        if (user) {
            const updatedFollowstatus = await toggleFollow(userId, activeStream.user_id, isFollowing);
            setIsFollowing(updatedFollowstatus);
        }
    }

    return (
        <>
            <Button onClick={handleClick}>{isFollowing ? 'Following' : 'Follow'}</Button>
        </>
    );
}