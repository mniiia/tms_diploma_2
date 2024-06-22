import { SearchForm } from '../SearchForm'
import { CiHeart, CiShoppingCart } from 'react-icons/ci'
import { NavLink } from 'react-router-dom'
import './Header.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { getCartFromLc } from '../../helpers/getCartFromLocalStorage'
import { IBookWithAmount } from '../BookOverview/BookOverview'
import { setAmount } from '../../redux/cart-amount-slice'

export function Header () {
  const amount = useSelector((state:RootState) => state.cart.amount)
  const dispatch = useDispatch()

  function getAmount () {
    const books:IBookWithAmount[] = getCartFromLc()
    let amount:number = 0
    for (let index = 0; index < books.length; index++) {
      amount += books[index].amount
    }
    dispatch(setAmount(amount))
    return amount
  }

  console.log(useSelector((state:RootState) => state.cart))

  const [booksAmount, setBooksAmount] = useState<number>(amount)

  useEffect(() => {
    getAmount()
    setBooksAmount(amount)
  }, [amount])

  return (
        <header className="header">
            <div className='header-container'>
                <NavLink to='/' className="name">BOOKSTORE</NavLink>
                <SearchForm></SearchForm>
                <div className="button-group">
                    <NavLink to='/favorite' className="favorite icon">{<CiHeart size={40}/>}</NavLink>
                    <NavLink to='/cart' className="cart icon">
                        <CiShoppingCart size={40}/>
                        <div className='amount'>{booksAmount}</div>
                    </NavLink>
                </div>
            </div>
        </header>
  )
}
