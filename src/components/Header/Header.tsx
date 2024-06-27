import { SearchForm } from '../SearchForm'
import { CiHeart, CiShoppingCart } from 'react-icons/ci'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { getCartFromLocalStorage } from '../../helpers/getCartFromLocalStorage'
import { IBookWithAmount, IBookDetails } from '../../interfaces/bookDetails'
import { setAmount } from '../../redux/cart-amount-slice'
import { setFavoriteAmount } from '../../redux/favorite-amount-slice'
import { getFavoriteFromLocalStorage } from '../../helpers/getFavoriteFromLocalStorage'
import { MdFiberNew } from 'react-icons/md'
import './Header.scss'

export function Header () {
  const cartAmount = useSelector((state:RootState) => state.cart.amount)
  const favoriteAmount = useSelector((state:RootState) => state.favorite.amount)
  const [cartBooksAmount, setCartBooksAmount] = useState<number>(cartAmount)
  const [cartFavoriteAmount, setFavoriteBooksAmount] = useState<number>(cartAmount)
  const dispatch = useDispatch()

  useEffect(() => {
    getCartAmount()
    getFavoriteAmount()
    setCartBooksAmount(cartAmount)
    setFavoriteBooksAmount(favoriteAmount)
  }, [cartAmount, favoriteAmount])

  function getCartAmount () {
    const books:IBookWithAmount[] = getCartFromLocalStorage() ? getCartFromLocalStorage() : []
    let amount:number = 0
    for (let index = 0; index < books.length; index++) {
      amount += books[index].amount ?? 1
    }
    dispatch(setAmount(amount))
    return amount
  }

  function getFavoriteAmount () {
    const books:IBookDetails[] = getFavoriteFromLocalStorage() ? getFavoriteFromLocalStorage() : []
    const amount:number = books.length
    dispatch(setFavoriteAmount(amount))
    return amount
  }

  return (
      <header className="header">
        <div className="header__container">
          <NavLink to='/' className="header__name">BOOKSTORE</NavLink>
          <SearchForm></SearchForm>
          <div className="header__button-group">
            <NavLink to='/new/page/1' className="header__icon--new header__icon">
              {<MdFiberNew size={40}/>}
            </NavLink>
            <NavLink to='/favorite' className="header__icon--favorite header__icon">
              {<CiHeart size={40}/>}
              <div className="header__amount">{cartFavoriteAmount}</div>
            </NavLink>
            <NavLink to='/cart' className="header__icon--cart header__icon">
              <CiShoppingCart size={40}/>
              <div className="header__amount">{cartBooksAmount}</div>
            </NavLink>
            </div>
        </div>
      </header>
  )
}
