import { useEffect, useState } from 'react';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer';
import auth from '../src/appwrite/auth.js';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice.js';
import { Outlet } from 'react-router-dom';
import Container from './components/Container/Container.jsx';

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
    <div className='w-screen h-screen'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer /> {/* Make sure to include your Footer */}
 

    </div>
    
  ) : (
    <div>Loading...</div> // Display loading indicator
  );
}

export default App;
