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
      <Nav />
      {children}
    </body>
  </html>
)

export default Layout;
