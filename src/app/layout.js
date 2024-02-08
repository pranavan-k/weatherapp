import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WeatherApp",
  description: "A simple weather app that uses a weather api to display the current weather as well as the forecasted weather for the next 3 days. Created as a project to test api fetch requests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
