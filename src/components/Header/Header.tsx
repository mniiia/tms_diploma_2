import { SearchForm } from '../SearchForm'
import { CiHeart, CiShoppingCart } from 'react-icons/ci'
import { Container } from '../Container/Container'
import './Header.scss'

export function Header () {
  return (
        <header className="header">
            <div className='header-container'>
                <div className="name">BOOKSTORE</div>
                <SearchForm></SearchForm>
                <div className="button-group">
                    <div className="favorite icon">{<CiHeart size={40}/>}</div>
                    <div className="cart icon"><CiShoppingCart size={40}/></div>
                </div>
            </div>
        </header>
  )
}
