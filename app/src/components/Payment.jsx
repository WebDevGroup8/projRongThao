import { useSearchParams } from "react-router-dom";

export default function Payment() {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");

  return (
    <div className="container">
      {success === "true" ? (
        <h2>Payment Successful! 🎉</h2>
      ) : (
        <h2>Payment Failed or No Status Provided.</h2>
      )}
    </div>
  );
}
