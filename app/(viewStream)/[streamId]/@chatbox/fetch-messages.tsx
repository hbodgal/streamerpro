// This file contains code to fetch live messages using Server Actions
"use client";
import { createClient }  from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { checkAuthenticationAction } from "@/lib/authActions";
import { Input } from "@/components/ui/input";

type message = {
    id: string;
    created_at: string;
    message: string;
    sender_id: string;
    stream_id: string;
}

export default function FetchMessages({ activeStreamId, latestMessages }: {
    activeStreamId: string;
    latestMessages: message[]
}) {
    const supabase = createClient();
    const [messages, setLiveMessages] = useState<message[]>(latestMessages);
    const [senderMessage, setSenderMessage] = useState('');
    const handleMessageSendingEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const user = await checkAuthenticationAction();
        const supabase = createClient();
        if (user) {
            const userId = user.user.id;
            const { error } = await supabase
                    .from('messages')
                    .insert({ sender_id: userId, message: senderMessage, stream_id: activeStreamId });
                if (error) {
                    console.log('SendMessageActionError', error);
                    return false;
                }
        }
        setSenderMessage('');
    }
    // Subscribes to the realtime update on Messages
    useEffect(() => {
        const channel = supabase.channel('realtime-messages')
        .on('postgres_changes', {
            event: 'INSERT',
            schema:'public',
            table: 'messages',
            filter: `stream_id=eq.${activeStreamId}`
        },
            payload => {
                console.log(payload);
                setLiveMessages(messages => [...messages, payload.new as message]);
            })
        .subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, [activeStreamId, supabase]);
    return (
        <>
        <div className="h-full flex flex-col">
            <div className=" text-black text-xl p-4">
                Chat
            </div>
            <div className="flex-1 overflow-y-auto mt-4 mb-4 p-4">
                <div>
                    {messages.map(msg => (
                        <p key={msg.id}>{msg.sender_id.split('-')[3]}: {msg.message}</p>
                    ))}
                </div>
            </div>
            <div>
                <form className="flex flex-row">
                    <Input type="text" value={senderMessage} 
                        onChange={(e) => setSenderMessage(e.target.value)}
                        placeholder="Type a message"
                    />
                    <Button type="submit" onClick={handleMessageSendingEvent}
                        className="ml-2">Send</Button>
                </form>
            </div>
        </div>
        </>
    )
}