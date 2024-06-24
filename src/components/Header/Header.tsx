import { SearchForm } from '../SearchForm'
import { CiHeart, CiShoppingCart } from 'react-icons/ci'
import { NavLink } from 'react-router-dom'
import './Header.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { getCartFromLc } from '../../helpers/getCartFromLocalStorage'
import { IBookDetails, IBookWithAmount } from '../BookOverview/BookOverview'
import { setAmount } from '../../redux/cart-amount-slice'
import { setFavoriteAmount } from '../../redux/favorite-amount-slice'
import { getFavoriteFromLc } from '../../helpers/getFavoriteFromLocalStorage'

export function Header () {
  const cartAmount = useSelector((state:RootState) => state.cart.amount)
  const favoriteAmount = useSelector((state:RootState) => state.favorite.amount)
  const dispatch = useDispatch()

  function getCartAmount () {
    const books:IBookWithAmount[] = getCartFromLc() ? getCartFromLc() : []
    let amount:number = 0
    for (let index = 0; index < books.length; index++) {
      amount += books[index].amount
    }
    dispatch(setAmount(amount))
    return amount
  }

  function getFavoriteAmount () {
    const books:IBookDetails[] = getFavoriteFromLc() ? getFavoriteFromLc() : []
    const amount:number = books.length
    dispatch(setFavoriteAmount(amount))
    return amount
  }

  const [cartBooksAmount, setCartBooksAmount] = useState<number>(cartAmount)
  const [cartFavoriteAmount, setFavoriteBooksAmount] = useState<number>(cartAmount)

  useEffect(() => {
    getCartAmount()
    getFavoriteAmount()
    setCartBooksAmount(cartAmount)
    setFavoriteBooksAmount(favoriteAmount)
  }, [cartAmount, favoriteAmount])

  return (
        <header className="header">
            <div className='header-container'>
                <NavLink to='/new/page/1' className="name">BOOKSTORE</NavLink>
                <SearchForm></SearchForm>
                <div className="button-group">
                    <NavLink to='/favorite' className="favorite icon">
                      {<CiHeart size={40}/>}
                      <div className='amount'>{cartFavoriteAmount}</div>
                    </NavLink>
                    <NavLink to='/cart' className="cart icon">
                        <CiShoppingCart size={40}/>
                        <div className='amount'>{cartBooksAmount}</div>
                    </NavLink>
                </div>
            </div>
        </header>
  )
}
