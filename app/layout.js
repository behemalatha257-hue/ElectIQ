import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "ElectIQ — Your AI Election Guide",
  description:
    "ElectIQ is an interactive, AI-powered election education platform. Learn the voting process, explore timelines, quiz yourself with flashcards, and get answers from our Gemini-powered civic assistant.",
  keywords: "election, voting, civic education, AI assistant, democracy, voter guide",
  authors: [{ name: "ElectIQ Team" }],
  openGraph: {
    title: "ElectIQ — Your AI Election Guide",
    description: "Understand elections like never before with AI-powered guidance.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#050d1a" />
      </head>
      <body>{children}</body>
    </html>
  );
}
