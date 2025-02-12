export default function Container({ children }) {
  return (
    <>
      {/* for Desktop apply max-w-screen-xl */}
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
        {children}
      </div>
    </>
  );
}
