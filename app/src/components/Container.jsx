export default function Container({ children }) {
  return (
    <>
      {/* for Desktop apply max-w-screen-xl */}
      <div className="mx-auto mb-4 flex max-w-screen-xl flex-wrap items-center justify-between md:mb-10">
        {children}
      </div>
    </>
  );
}
