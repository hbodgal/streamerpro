import ViewStreams from "./(viewStream)/page";
export default async function Index() {

  return (
    <>
      <main className="flex-1 flex flex-row gap-6 px-4">
        <ViewStreams />
      </main>
    </>
  );
}
