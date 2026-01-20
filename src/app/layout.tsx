import "./global.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, Brygada_1918 } from "next/font/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.vincilogic.com"),

  title: {
    default: "Vinci Logic | AI-Powered Security Operations Platform",
    template: "%s | Vinci Logic",
  },

  description:
    "Vinci Logic is an AI-powered security operations platform enabling detection and response as code, automated investigations, and faster incident response for modern SOC teams.",

  applicationName: "Vinci Logic",

  keywords: [
    "SOC platform",
    "Security Operations",
    "AI SOC",
    "Detection as Code",
    "Security Automation",
    "SIEM",
    "SOAR",
    "Incident Response",
    "Cybersecurity Platform",
  ],

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/vinci-logo.svg",
    shortcut: "/vinci-logo.svg",
    apple: "/vinci-logo.svg",
  },

  openGraph: {
    type: "website",
    siteName: "Vinci Logic",
    title: "Vinci Logic | AI-Powered Security Operations Platform",
    description:
      "Detection and response as code for modern security operations. Reduce alert fatigue, automate investigations, and respond to threats faster with AI.",
    url: "https://www.vincilogic.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vinci Logic Security Operations Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vinci Logic | AI-Powered SOC Platform",
    description:
      "Modernize your SOC with AI-driven detection, investigation, and response.",
    images: ["/og-image.png"],
    creator: "@vincilogic",
  },

  category: "technology",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

const brygada = Brygada_1918({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-brygada",
  display: "swap",
});
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${brygada.variable}`}>{children}</body>
    </html>
  );
}
