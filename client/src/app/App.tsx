import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../features/homePage';
import LoginPage from '../features/loginPage';
import MessengerPage from '../features/messengerPage';
import PostPage from '../features/postPage';
import ProfilePage from '../features/profilePage';
import SearchPage from '../features/searchPage';
import { initiateSocketConnection } from '../helper/socketHelper';
import PrivateRoute from '../route/PrivateRoute';

function App() {
  initiateSocketConnection();
  return (
    <div className='h-full w-full app'>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path='/posts/:id'
            element={
              <PrivateRoute>
                <PostPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/posts/create'
            element={
              <PrivateRoute>
                <PostPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/messenger'
            element={
              <PrivateRoute>
                <MessengerPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/search'
            element={
              <PrivateRoute>
                <SearchPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/users/:id'
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
