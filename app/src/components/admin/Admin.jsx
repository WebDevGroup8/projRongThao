import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  navigate("/admin/dashboard");
  return;
}
