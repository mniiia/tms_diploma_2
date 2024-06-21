import { SearchForm } from '../SearchForm'
import { CiHeart, CiShoppingCart } from 'react-icons/ci'
import { NavLink } from 'react-router-dom'
import './Header.scss'

export function Header () {
  return (
        <header className="header">
            <div className='header-container'>
                <NavLink to='/' className="name">BOOKSTORE</NavLink>
                <SearchForm></SearchForm>
                <div className="button-group">
                    <NavLink to='/favorite' className="favorite icon">{<CiHeart size={40}/>}</NavLink>
                    <NavLink to='/cart' className="cart icon"><CiShoppingCart size={40}/></NavLink>
                </div>
            </div>
        </header>
  )
}
