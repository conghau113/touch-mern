import HomePage from '../features/homePage';
import LoginPage from '../features/loginPage';
import ProfilePage from '../features/profilePage';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

function App() {
  const isAuth = Boolean(useSelector((state: RootState) => state.token));

  return (
    <div className='h-full w-full app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={isAuth ? <HomePage /> : <Navigate to={'/'} />} />
          <Route path='/profile/:userId' element={isAuth ? <ProfilePage /> : <Navigate to={'/'} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
