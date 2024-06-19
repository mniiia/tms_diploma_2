import './App.scss'
import { Header } from './components/Header/Header'

import { BookCard } from './components/BookCard/BookCard'
import { AllBooksForm } from './components/AllBooksForm/AllBooksForm'

function App () {
  return (
    <>
        <Header></Header>
        <AllBooksForm></AllBooksForm>
    </>
  )
}

export default App
