import AppBar from "./app-bar";
import Footer from "./footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <AppBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
