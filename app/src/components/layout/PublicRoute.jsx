import Footer from "@layout/Footer";
import NavigationBar from "@layout/NavigationBar";
import ScrollToTop from "@layout/ScrollToTop";
import SupportChat from "@layout/SupportChat";
import { Outlet } from "react-router-dom";
import Container from "@layout/Container";

export default function PublicRoute() {
  return (
    <>
      <ScrollToTop />
      <NavigationBar />
      <Container>
        <Outlet />
        <SupportChat />
      </Container>
      <Footer />
    </>
  );
}
