import { ReactNode } from 'react'
import './globals.css'
import Nav from '@/components/Nav'
import AuthProvider from '@/components/AuthProvider'

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard for github actions',
}

interface Props {
  children?: ReactNode
}


const Layout = ({ children }: Props) => (
  <html lang="en">
    <body>
      <AuthProvider>
        <div className="h-[8vh] flex items-center justify-center" >
          <Nav />
        </div>
        <div className="min-w-full flex justify-center items-start">
          {children}
        </div>
      </AuthProvider>
    </body>
  </html>
)

export default Layout;
