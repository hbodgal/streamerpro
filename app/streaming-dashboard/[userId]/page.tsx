export default function ManageStream({ params}: { params: {streamId: string} }) {
    return <h1>Create Stream and Chat for User {params.streamId}</h1>

    // throw new Error("Error streaming {param.streamId}")
}