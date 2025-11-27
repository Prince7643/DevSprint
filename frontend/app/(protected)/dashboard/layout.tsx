import AuthProvider from "@/components/authProvider/authProvider";
import Navbar from "@/components/navbar/Navbar";
import { ThemeProvider } from "@/theme/provider";
import AuthSync from "./provider/provider";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export default function DashboardLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return(
      <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
            <AuthProvider>
                <div className="min-h-screen bg-background">
                  <Navbar></Navbar>
                    <AuthSync />
                    {children}
                  <Footer></Footer>
                </div>
            </AuthProvider>
        </ThemeProvider>
      </div>
  );
}