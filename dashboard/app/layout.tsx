import { ReactNode } from 'react'
import './globals.css'
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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