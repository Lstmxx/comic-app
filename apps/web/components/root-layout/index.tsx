import AppBar from "./app-bar";
import Content from "./content";
import Footer from "./footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <AppBar />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
}
