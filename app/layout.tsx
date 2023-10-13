import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MainProvider } from "./Context/mainProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lojiper Test Case",
  description: "Lojiper Web Uygulaması Test Case",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body className={inter.className}>
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
