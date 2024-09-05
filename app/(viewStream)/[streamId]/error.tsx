// This file contains code that is thrown on error with a Button to retry.
"use client";
export default function ErrorBoundry({error, reset}: { 
    error: Error;
    reset: () => void;
 }) {
    return <div>{error.message}<button onClick={reset}>Try Again</button></div>
}