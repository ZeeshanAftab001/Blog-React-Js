import { useEffect, useState } from 'react';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer';
import auth from '../src/appwrite/auth.js';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice.js';
import { Outlet } from 'react-router-dom';


function App() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    auth
      .currentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      })
      .finally(() => setLoader(false));
  }, [dispatch]);

  return !loader ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        TODO:  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App;
