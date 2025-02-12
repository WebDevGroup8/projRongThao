export default function Container({ children }) {
  return (
    <>
      {/* for Desktop apply max-w-screen-xl */}
      <div className="mx-auto mb-4 flex w-full max-w-screen-xl flex-wrap items-start justify-start md:mb-10">
        {children}
      </div>
    </>
  );
}
