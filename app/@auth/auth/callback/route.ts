import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  console.log('origin',origin);
  const code = searchParams.get('code');

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Redirect to the root path `/` after successful session exchange
      return NextResponse.redirect(`${origin}/`);
    }
  }

  // If there is an error or no code, return the user to the root path `/`
  return NextResponse.redirect(`${origin}/`);
}
