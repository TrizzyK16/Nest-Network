import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import LandingPage from './components/LandingPage/LandingPage';
import SpotDetails from './components/SpotDetailsPage/SpotDetails';
import ReviewsBySpot from './components/ReviewsBySpot/ReviewsBySpot' 
import LoginFormModal from './components/LoginFormModal/LoginFormModal';
import SignupFormModal from './components/SignupFormModal/SignupFormModal';
import CreateASpotPage from './components/CreateASpotPage/CreateASpot'
import ManageSpotsPage from './components/ManageSpotsPage/ManageSpots'
import UpdateSpotPage from './components/UpdateSpotPage/UpdateSpot'
import ManageReviews from './components/ManageReviewsPage/ManageReviews';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: 'login',
        element: <LoginFormModal />
      },
      {
        path: 'signup',
        element: <SignupFormModal />
      },
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails />,
      },
      {
        path: '/spots/:spotId/reviews',
        element: <ReviewsBySpot />
      },
      {
        path: '/spots/new',
        element: <CreateASpotPage />
      },
      {
        path: '/spots/session',
        element: <ManageSpotsPage />
      },
      {
        path: '/spots/:spotId/edit',
        element: <UpdateSpotPage />
      },
      {
        path: '/reviews/current',
        element: <ManageReviews />
      },
      {
        path: '*',
        element: <h1>Tf u doing here, stupid?</h1>
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
