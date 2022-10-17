import headerLogoPath from '../images/headerLogo.svg'
import { Link, useLocation } from 'react-router-dom';

function Header({ userEmail, loggedIn, handleSignOut }) {
    const { pathname } = useLocation();
    const linkText = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
    const linkRoute = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;
    
    return (
        <header className="header">
            <img className="logo" src={headerLogoPath} alt="Логотип Mesto Russia"/>
            <div>
                {loggedIn ? 
                    (<div className="header__container">
                        <p className="header__email">{userEmail}</p>
                        <Link className="header__link" to="" onClick={handleSignOut}>Выйти</Link>
                    </div>) : (<Link to={linkRoute} className="header__link">{linkText}</Link>)
                }
            </div>
        </header>
    );
}

export default Header;

