import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import { Link } from 'react-router-dom';
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
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
    window.location.href = '/';
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile">
      <button onClick={toggleMenu} className='profile-button'>
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className='profile-info-dropdown'>
            <ul className='ul-info'>
              <p className='ul-sub-info'>Hello, {user.firstName}</p>
              <p className='ul-sub-info'>{user.email}</p>
              <div className='ul-sub-info'>
                <Link to="/spots/session" className='manage-spots-link'>Manage Spots</Link>
                <Link to="/reviews/current" className='manage-reviews-link'>Manage Reviews</Link>
              </div>
              <div className='ul-sub-info'>
                <button onClick={logout} className='logout-button'>Log Out</button>
              </div>
            </ul>
          </div>
        ) : (
          <>
            <OpenModalMenuItem
              className='login-button'
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              className='signup-button'
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;