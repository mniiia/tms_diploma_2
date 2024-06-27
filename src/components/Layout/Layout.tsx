import { Outlet } from 'react-router-dom'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'

export function Layout () {
  return (
      <div className="app__page">
        <Header></Header>
          <main className="app__main">
            <Outlet></Outlet>
          </main>
        <Footer></Footer>
      </div>
  )
}
