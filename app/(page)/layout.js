import { Poppins } from "next/font/google";
import '../../app/globals.css'
const inter = Poppins({ subsets: ["latin"], weight:["400", "500","600","700","800","900"] });

export const metadata = {
  title: 'User page',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
