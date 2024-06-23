import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { NavLink, useNavigate } from 'react-router-dom'
import { clearAnswer } from '../redux/books-slice'
import { useDispatch } from 'react-redux'
import { GrAction } from 'react-icons/gr'

export function SearchForm () {
  const [request, newRequest] = useState<string>('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleChange (event:React.ChangeEvent<HTMLInputElement>) {
    console.log('changed', event.target.value)
    newRequest(event.target.value)
  }

  function handleSubmit (event) {
    event.preventDefault()
    console.log(1)

    navigate(`/search/${request}/1`)
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
