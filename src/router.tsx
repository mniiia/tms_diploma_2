import { NewBooks } from './components/Pages/NewBooks'
import { Layout } from './components/Layout/Layout'
import { createBrowserRouter } from 'react-router-dom'
import { FavoriteBooks } from './components/Pages/FavoriteBooks'
import { CartBooks } from './components/Pages/CartBooks'
import { Book } from './components/Pages/Book'

export const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/new',
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
