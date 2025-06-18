import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = false;
  return isAuthenticated ? element : <Login />;
};

const AppRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { backgroundLocation?: Location };
  const backgroundLocation = state?.backgroundLocation;

  const closeModal = () => navigate(-1);

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<ProtectedRoute element={<Login />} />} />
        <Route
          path='/register'
          element={<ProtectedRoute element={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<ProtectedRoute element={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute element={<ResetPassword />} />}
        />
        <Route
          path='/profile'
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute element={<ProfileOrders />} />}
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`#${location.pathname.match(/\d+/)}`}
                onClose={closeModal}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={`Детали ингредиента`} onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute
                element={
                  <Modal
                    title={`#${location.pathname.match(/\d+/)}`}
                    onClose={closeModal}
                  >
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </>
  );
};

const App = () => (
  <Router>
    <div className={styles.app}>
      <AppHeader />
      <AppRoutes />
    </div>
  </Router>
);

export default App;
