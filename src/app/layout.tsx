import "./globals.css";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import CombinedProviders from "@/provider/AllProviders";
import Footer from "@/components/Footer";
// import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata = {
  title: "مبدع",
  description: "نحن منصة مختصة بالعمل الحر",
  icons: {
    icon: "/public/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" suppressHydrationWarning>
      <body className="bg-[#f7f8fa]">
        {/* <ThemeProvider> */}
        <TooltipProvider>
          <CombinedProviders>
            {children}
            <Toaster
              toastOptions={{
                classNames: {
                  actionButton: "bg-lamagreen text-white hover:bg-lamagreen/90",
                  cancelButton: "bg-gray-100 text-red-500 hover:bg-gray-200",
                  toast: "bg-white border border-gray-200",
                },
              }}
              position="top-right"
              richColors={false}
              closeButton
              dir="rtl"
            />
          </CombinedProviders>
        </TooltipProvider>
        <Footer />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
