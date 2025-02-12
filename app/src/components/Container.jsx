export default function Container({ children }) {
  return (
    <>
      {/* for Desktop apply max-w-screen-xl */}
      <div className="mx-auto mb-4 w-full max-w-screen-xl items-center justify-between md:mb-10">
        {children}
      </div>
    </>
  );
}
