import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import {Suspense} from "react"


export const metadata: Metadata = {
  title: "Email Classifier by siddanth",
  description: "classify your emails with OpenAI's GPT model",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Suspense>
          {children}
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
