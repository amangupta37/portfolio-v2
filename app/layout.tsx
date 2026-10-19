import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FollowerPointerCard } from "@/components/ui/following-pointer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aman Gupta Official",
  description: "Frontend Engineer || React || JavaScript || TypeScript || Next.js || Tailwind CSS || HTML || CSS",
  icons: {
    icon: "/MyProfile.png",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FollowerPointerCard className="flex w-full flex-1 flex-col">
          {children}
        </FollowerPointerCard>
      </body>
    </html>
  );
};

export default RootLayout;
