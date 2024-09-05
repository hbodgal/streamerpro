// This file contains code to redirect user with specific error message, url and status.
import { redirect } from "next/navigation";

export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}
