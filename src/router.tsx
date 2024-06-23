import { NewBooks } from './components/Pages/NewBooks'
import { Layout } from './components/Layout/Layout'
import { createBrowserRouter } from 'react-router-dom'
import { FavoriteBooks } from './components/Pages/FavoriteBooks'
import { CartBooks } from './components/Pages/CartBooks'
import { Book } from './components/Pages/Book'
import { Search } from './components/Pages/Search'

export const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <div>DODELAT</div>
      },
      {
        path: '/search/:query/:id',
        element: <Search/>
      },
      {
        path: '/page/:id',
        element: <NewBooks/>
      },
      {
        path: '/favorite',
        element: <FavoriteBooks/>
      },
      {
        path: '/cart',
        element: <CartBooks/>
      },
      {
        path: '/book/:id',
        element: <Book></Book>
      }
    ]
  }
])
