import { createClient } from "@/utils/supabase/server";
import { checkAuthenticationAction } from "./authActions";

export async function sendMessage(message: string, streamId: string) {
    const user = await checkAuthenticationAction();
    const supabase = createClient();
    if (user) {
        const userId = user.user.id;
           const { error } = await supabase
                .from('messages')
                .insert({ sender_id: userId, message: message, streamId: streamId });
            if (error) {
                console.log('SendMessageActionError', error);
                return false;
            }
    }
    }