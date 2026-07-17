import type { Metadata } from "next";
import { Inter, Syne, Manrope } from "next/font/google";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tharun R — Software Engineer",
  description:
    "Portfolio of Tharun R — an aspiring Software Engineer skilled in full-stack development with Java, Spring Boot, React.js, Node.js, MongoDB, and MySQL. Building impactful technology solutions.",
  keywords: ["software engineer", "portfolio", "full-stack developer", "React", "Spring Boot", "Tharun R"],
  authors: [{ name: "Tharun R" }],
  openGraph: {
    title: "Tharun R — Software Engineer",
    description:
      "Aspiring Software Engineer building scalable full-stack applications and impactful technology solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${manrope.variable} antialiased`}>
      <meta name="google-site-verification" content="G21jdSW07mkG23FloQnURCX-c7nMBKP7o-Un88h4-Ls" />
      <body className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
