export default function Otherwise() {
  return (
    <div className="flex h-full min-h-screen w-full justify-center">
      <div className="mt-20 flex flex-col text-center">
        <p className="text-4xl font-bold">Path not found</p>
        <a className="mt-4 text-xl hover:underline" href="/">
          Go Back
        </a>
      </div>
    </div>
  );
}
