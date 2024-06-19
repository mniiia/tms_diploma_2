import { CiSearch } from 'react-icons/ci'

export function SearchForm () {
  return (
        <form className="search-form" action="submit">
            <input className="search-form__input" type="search" />
            <div className="search-form__button"><CiSearch size={40}/></div>
        </form>
  )
}
