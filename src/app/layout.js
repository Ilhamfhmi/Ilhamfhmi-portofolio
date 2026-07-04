import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Ilham Fahmi | Portfolio",
  description: "Portfolio of Ilham Fahmi - System Analyst, IT Audit, & Full-Stack Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0d0d0d] text-white">
        {/* Pasang Navbar di atas children */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}