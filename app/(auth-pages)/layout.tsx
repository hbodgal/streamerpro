export default async function Layout({
  children,
  model
}: {
  children: React.ReactNode;
  model: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl flex flex-col gap-12 items-start">
      {children}
      {model}
    </div>
  );
}
