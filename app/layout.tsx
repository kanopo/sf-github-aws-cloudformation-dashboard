import type { FC } from 'react'
import { LayoutProps } from '@/types/LayoutProps'
import './globals.css'


export const metadata = {
  title: 'Dashboard',
  description: 'Managment dashboard for Github and AWS Cloudformation',
}


const RootLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <html>
      <body>{children}</body>
    </html>

  )
}

export default RootLayout
