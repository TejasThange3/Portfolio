import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Oswald } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ViewTransitions } from "next-view-transitions";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tejas Thange | AI & ML Engineer",
  description: "Portfolio of Tejas Thange - AI & ML Engineer specializing in building intelligent systems with modern web technologies.",
  keywords: ["AI", "ML", "Machine Learning", "Developer", "Portfolio", "Tejas Thange"],
  authors: [{ name: "Tejas Thange" }],
  openGraph: {
    title: "Tejas Thange | AI & ML Engineer",
    description: "Portfolio of Tejas Thange - AI & ML Engineer",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${spaceGrotesk.variable} ${oswald.variable} font-sans antialiased bg-neutral-950 dark:bg-neutral-950 text-neutral-900 dark:text-white overflow-x-hidden transition-colors duration-300`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SmoothScrollProvider>
              <main className="min-h-screen w-full">
                {children}
              </main>
            </SmoothScrollProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
