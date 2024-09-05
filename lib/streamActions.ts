// This file contains code of Streaming Actions to perform Server Side on demand.
"use server";
import { createClient } from "@/utils/supabase/client";
import { Resend } from 'resend';
import { getUserAction } from "./authActions";

const resend = new Resend(process.env.RESEND_API_KEY);

// Server Action called to Follow and Unfollow Channel
export async function toggleFollow(userId: string, streamId: string, isFollowing: boolean) {
    const supabase = createClient();
    if (isFollowing) {
        const { error } = await supabase
            .from('subscriptions')
            .delete()
            .match({ user_id: userId, subscription_id: streamId });

        if (error) {
            console.log(error);
            return false;
        } else {
            return false;
        }
    } else {
        const { error } = await supabase
            .from('subscriptions')
            .insert({ user_id: userId, subscription_id: streamId });
        if (error) {
            console.log(error);
            return false;
        } else {
            return true;
        }
    }
}

// Server Action called to check follow status on load
export async function checkFollowStatus(userId: string, streamId: string) { 
    const supabase = createClient();
    const { data, error } = await supabase
        .from("subscriptions")
        .select().match({ user_id: userId, subscription_id: streamId }).single();
    if (error) {
        // console.log('checkFollowStatus', error);
        return false; 
    }
    return true;
}

// Server Action called to check Streaming status on load
export async function getStreamingStatusAction() {
 const supabase = createClient();
    const user = await getUserAction();
    if (user) { 
        const userId = user.user.id;
        const { data, error } = await supabase
            .from("streams")
            .select().eq('user_id', userId);
        if (error) {
            console.log('getStreamingStatusAction', error);
        }
        if (data && data.length > 0) {
            return true;
        }
        return false
    }
    return false;
}

// Server Action called to update Streaming status on load
export async function UpdateUserStreamingStatusAction(isStreaming: boolean) {
    const supabase = createClient();
    const user = await getUserAction();
    if (user) {
        const userId = user.user.id;
        if (isStreaming) {
           const { error } = await supabase
                .from('streams')
                .insert({ user_id: userId, is_streaming: true });
            if (error) {
                console.log('UpdateUserStreamingStatusAction', error);
                return false;
            } else {
                notifySubscribersOnStreamActivation();
                return true;
            }
        } else {
             const { error } = await supabase
                .from('streams')
                .delete()
                .match({ user_id: userId });
            if (error) {
                console.log(error);
                return false;
            } else {
                return false;
            }
        }
    }
}

// Server Action called to fetch Subscribers when streaming is turned on
export async function notifySubscribersOnStreamActivation() {

    const supabase = createClient();
    const user = await getUserAction();
    if (user) {
        const userId = user?.user.id;
        const { data, error } = await supabase
            .from("subscriptions")
            .select(`*, profiles(email)`).match({ subscription_id: userId });
        if (error) {
            console.log('notifySubscribersOnStreamActivation', error);
            return false; 
        }
        const subscribersList = data.map(item => item.profiles.email);
        if (subscribersList.length > 0) {
            sendEmails(userId, subscribersList);   
        }
    }
}

// Server Action called to send email to fetched subscribers
export async function sendEmails(streamId: string, subscribersList: string[]) {

        const ChannelName = await getChannelName(streamId);
        const { data, error } = await resend.emails.send({
        from: 'Vercel <vercel@resend.dev>',
        to: subscribersList,
        subject: `${ChannelName} is Live`,
        text: `${ChannelName} in live on Streamer Pro. Check it out!`,
    });

    if (error) {
        console.error('Error sending email to the subscribers.', error);
        return;
    }
}

// Server Action called to get name of the Channel based on ID
export async function getChannelName(streamId: string) {
        const supabase = createClient();
        const { data, error } = await supabase
        .from("profiles")
        .select().match({ id: streamId }).single();
    if (error) {
        console.log('getChannelName',error);
        return false; 
    }
    return data.full_name;
}