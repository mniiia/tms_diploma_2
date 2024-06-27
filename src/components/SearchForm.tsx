import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { NavLink, useNavigate } from 'react-router-dom'
import { correctString } from '../helpers/correctSring'

export function SearchForm () {
  const [request, setRequest] = useState<string>('')
  const navigate = useNavigate()

  function handleChange (event:React.ChangeEvent<HTMLInputElement>) {
    setRequest(correctString(event.target.value))
  }

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate(`/search/${request}/1`)
    const inputElement = event.currentTarget.closest('form')?.querySelector('input') as HTMLInputElement | null
    if (inputElement) {
      inputElement.value = ''
    }
  }

  function handleClickClear (event:React.MouseEvent<HTMLAnchorElement>) {
    const inputElement = event.currentTarget.closest('form')?.querySelector('input') as HTMLInputElement | null
    if (inputElement) {
      inputElement.value = ''
    }
  }

  return (
      <form className="search-form" action="submit" onSubmit={handleSubmit}>
        <input onChange={handleChange} className="search-form__input" type="search" />
        <NavLink to={`/search/${request}/1`} onClick={handleClickClear} className="search-form__button"><CiSearch size={40}/></NavLink>
      </form>
  )
}
