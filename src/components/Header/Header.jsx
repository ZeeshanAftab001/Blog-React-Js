import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Container from '../Container/Container.jsx';
import LogoutBtn from './LogoutBtn.jsx';

function Header() {
    const authStatus = useSelector((state) => state.auth.status); // Accessing auth state

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: authStatus,
        },
        {
            name: "Contact",
            slug: "/contact",
            active: authStatus,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        }
    ];

    return (
        <header>
       
            <Container>
                <div className="flex">
                <div className='mr-4'>
                    <Link to="/">Logo</Link>
                </div>
                <ul className="flex gap-4 ml-4 ">
                    {navItems.map((item) => item.active ?
                        <li key={item.name}>
                        <Link to={item.slug}>
                            {/* Link wrapping for proper navigation */}
                        
                         {item.name}
                        </Link>
                        </li>:null

                    )}

                    {authStatus && (  // if user is loggedin it must show a logout button
                        <li>
                            <LogoutBtn />
                        </li>
                    )}
                </ul>

                </div>
            </Container>
        </header>
    );
}

export default Header;
