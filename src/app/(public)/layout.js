import Footer from "../(frontend)/component/Footer";
import Header from "../(frontend)/component/Header";

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
}
