import HomePage from '../features/homePage';
import LoginPage from '../features/loginPage';
import ProfilePage from '../features/profilePage';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='h-full w-full'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/profile/:userId' element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
