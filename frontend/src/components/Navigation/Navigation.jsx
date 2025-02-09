import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './Navigation.css';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const closeMenu = () => setShowMenu(false);

  return (

    <nav className='nav-bar'>
      <NavLink className='nav-logo' to="/">Nest Network</NavLink>
      {/* Only show burger menu if no user is logged in */}
      {!sessionUser && (
        <>
          <button className="burger-menu" onClick={toggleMenu}>
            <FaBars />
          </button>

          {showMenu && (
            <>
              <ul className="session-links">
                {isLoaded && (
                  <>
                    <div className="login-link">
                      <OpenModalButton
                        buttonText="Log In"
                        modalComponent={<LoginFormModal />}
                      />
                    </div>
                    <div className="signup-link">
                      <OpenModalButton
                        buttonText="Sign Up"
                        modalComponent={<SignupFormModal />}
                      />
                    </div>
                  </>
                )}
              </ul>
              <div className="backdrop" onClick={closeMenu}></div>
            </>
          )}
        </>
      )}

      {/* Show ProfileButton if user is logged in */}
      {sessionUser && (
        <ProfileButton user={sessionUser} />
      )}
    </nav>
  );
}

export default Navigation;
