import { ReactNode } from 'react'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata = {
  title: 'AWS + Github stack deployment',
  description: 'Web app written in nextjs to administrate AWS cloudformation deployment and the relative projects stored in github',
}

interface Props {
  children?: ReactNode
}


const Layout = ({ children }: Props) => (
  <html lang="en">
    <body>
      <div className="h-[8vh] flex items-center justify-center" >
        <Nav />
      </div>
      <div className="min-w-full flex justify-center items-start">
        {children}
      </div>
    </body>
  </html>
)

export default Layout;
