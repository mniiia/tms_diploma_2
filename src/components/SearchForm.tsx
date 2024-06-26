import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { NavLink, useNavigate } from 'react-router-dom'

export function SearchForm () {
  const [request, setRequest] = useState<string>('')
  const navigate = useNavigate()

  function handleChange (event:React.ChangeEvent<HTMLInputElement>) {
    console.log('changed', event.target.value)
    const requestWithOutSpace:string = event.target.value.replace(/ /g, '')
    const requestWithoutHash:string = requestWithOutSpace.replace(/#/g, '')
    setRequest(requestWithoutHash)
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
