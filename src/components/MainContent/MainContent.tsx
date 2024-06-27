import { NavLink } from 'react-router-dom'
import { MdFiberNew } from 'react-icons/md'
import { CiShoppingCart, CiHeart } from 'react-icons/ci'
import './MainContent.scss'
import { Container } from '../Container/Container'

export function MainContent () {
  return (
    <Container>
        <div className="main-page__buttons">
            <NavLink to="/new/page/1" className="main-page__link">
                <MdFiberNew size={100}/>
            </NavLink>
            <NavLink to="/favorite" className="main-page__link">
                <CiHeart size={100}/>
            </NavLink>
            <NavLink to="/cart" className="main-page__link">
                <CiShoppingCart size={100}/>
            </NavLink>
        </div>
    </Container>
  )
}
