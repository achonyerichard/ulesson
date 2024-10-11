import type { Metadata } from "next";

import "./globals.css";
import {  Montserrat } from "next/font/google";
import { Providers } from "./provider";



const montserat = Montserrat({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "ULesson",
  description: "U Lesson Test",
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserat.className} mx-auto max-w-[1728px]`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
