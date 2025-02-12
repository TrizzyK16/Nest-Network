import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './Navigation.css';
import { FaBars } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import logo from './images/logo.png';

function Navigation({ isLoaded }) {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  return (

    <nav className='nav-bar' ref={navRef}>
      <NavLink className='nav-logo' to="/">
        <img src={logo} alt="Icon" className="logo"/>Nest Network
      </NavLink>
      {/* Only show burger menu if no user is logged in */}
      {!sessionUser && (
        <>
          <button className="burger-menu" onClick={toggleMenu}>
            <FaBars />
          </button>

          {showMenu && (
            <div className="menu-container" >
              <ul className="session-links">
                {isLoaded && (
                  <>
                    <div className='login-link'>
                      <OpenModalButton
                        className='log-in-button'
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
            </div>
          )}
        </>
      )}

      {/* Show ProfileButton if user is logged in */}
      {sessionUser && sessionUser.id !== 4 &&(
          <>
            <Link to='/spots/new' className="new-spot-text">Create a New Spot</Link>
              <ProfileButton user={sessionUser} />
          </>
      )}
      {sessionUser && sessionUser.id === 4 && (
        <>
          <button onClick={logout}>Log Out</button>
        </>
      )}
    </nav>
  );
}

export default Navigation;
