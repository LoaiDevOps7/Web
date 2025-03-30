import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import UserProvider from "@/context/UserContext";
import { ActivityProvider } from "@/context/ActivityContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { RatingsProvider } from "@/context/RatingsContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { WalletProvider } from "@/context/WalletContext";
import { ProjectProvider } from "@/context/ProjectContext";
// import { ChatProvider } from "@/context/ChatContext";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider>
          <UserProvider>
            <ProjectProvider>
              <ProfileProvider>
                <ActivityProvider>
                  <NotificationProvider>
                    <PortfolioProvider>
                      <RatingsProvider>
                        <WalletProvider>
                          {/* <ChatProvider> */}
                            {children}
                            <Toaster
                              toastOptions={{
                                classNames: {
                                  actionButton:
                                    "bg-lamagreen text-white hover:bg-lamagreen/90",
                                  cancelButton:
                                    "bg-gray-100 text-red-500 hover:bg-gray-200",
                                  toast: "bg-white border border-gray-200",
                                },
                              }}
                              position="top-right"
                              richColors={false}
                              closeButton
                              dir="rtl"
                            />
                          {/* </ChatProvider> */}
                        </WalletProvider>
                      </RatingsProvider>
                    </PortfolioProvider>
                  </NotificationProvider>
                </ActivityProvider>
              </ProfileProvider>
            </ProjectProvider>
          </UserProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
