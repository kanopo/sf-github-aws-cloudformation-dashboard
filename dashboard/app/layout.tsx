import { ReactNode } from 'react'
import './globals.css'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'

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
      <Provider>
        <Nav />
        {children}
      </Provider>
    </body>
  </html>
)

export default Layout;
