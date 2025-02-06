import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef(null);

  const toggleMenu = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      // Ensure ulRef is not null and user clicked outside the dropdown
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
        <FaUserCircle size={24} />
      </button>
      {showMenu && (
        <ul className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg" ref={ulRef}>
          {user ? (
            <>
              <li className="px-4 py-2 text-gray-800">{user.username}</li>
              <li className="px-4 py-2 text-gray-800">{user.firstName} {user.lastName}</li>
              <li className="px-4 py-2 text-gray-800">{user.email}</li>
              <li>
                <button onClick={logout} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={() => setShowMenu(false)}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={() => setShowMenu(false)}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;