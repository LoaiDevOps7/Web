import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import CombinedProviders from "@/provider/AllProviders";
import Footer from "@/components/Footer";
// import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata = {
  title: "مبدع",
  description: "نحن منصة مختصة بالعمل الحر",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className="bg-[#f7f8fa]">
        {/* <ThemeProvider> */}
        <TooltipProvider>
          <CombinedProviders>
            {children}
            <Toaster />
          </CombinedProviders>
        </TooltipProvider>
        <Footer />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
