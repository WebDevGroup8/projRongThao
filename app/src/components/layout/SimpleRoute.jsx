import Footer from "@layout/Footer";
import NavigationBar from "@layout/NavigationBar";
import ScrollToTop from "@layout/ScrollToTop";
import SupportChat from "@layout/SupportChat";
import { Outlet } from "react-router-dom";

export default function SimpleRoute() {
  return (
    <>
      <ScrollToTop />
      <NavigationBar />
      <Outlet />
      <SupportChat />
      <Footer />
    </>
  );
}
