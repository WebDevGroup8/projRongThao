import { useNavigate } from "react-router-dom";
import { path } from "@/conf/main";
export default function Admin() {
  const navigate = useNavigate();
  navigate(path.admin.dashboard);
  return;
}
