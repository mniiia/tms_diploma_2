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
import { MdFiberNew } from 'react-icons/md'

export function Header () {
  const cartAmount = useSelector((state:RootState) => state.cart.amount)
  const favoriteAmount = useSelector((state:RootState) => state.favorite.amount)
  const dispatch = useDispatch()

  function getCartAmount () {
    const books:IBookWithAmount[] = getCartFromLc() ? getCartFromLc() : []
    let amount:number = 0
    for (let index = 0; index < books.length; index++) {
      amount += books[index].amount ?? 1
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
            <div className='header__container'>
                <NavLink to='/' className="header__name">BOOKSTORE</NavLink>
                <SearchForm></SearchForm>
                <div className="header__button-group">
                    <NavLink to='/new/page/1' className="header__icon--new header__icon">
                     {<MdFiberNew size={40}/>}
                    </NavLink>
                    <NavLink to='/favorite' className="header__icon--favorite header__icon">
                      {<CiHeart size={40}/>}
                      <div className='header__amount'>{cartFavoriteAmount}</div>
                    </NavLink>
                    <NavLink to='/cart' className="header__icon--cart header__icon">
                        <CiShoppingCart size={40}/>
                        <div className='header__amount'>{cartBooksAmount}</div>
                    </NavLink>
                </div>
            </div>
        </header>
  )
}
