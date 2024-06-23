import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { NavLink } from 'react-router-dom'

export function SearchForm () {
  const [request, newRequest] = useState<string>('')

  function handleChange (event:React.ChangeEvent<HTMLInputElement>) {
    console.log('changed', event.target.value)
    newRequest(event.target.value)
  }

  function handleClickClear (event:React.MouseEvent<HTMLAnchorElement>) {
    const inputElement = event.currentTarget.closest('form')?.querySelector('input') as HTMLInputElement | null
    if (inputElement) {
      inputElement.value = ''
    }
  }

  return (
        <form className="search-form" action="submit">
            <input onChange={handleChange} className="search-form__input" type="search" />
            <NavLink to={`/search/${request}/1`} onClick={handleClickClear} className="search-form__button"><CiSearch size={40}/></NavLink>
        </form>
  )
}
