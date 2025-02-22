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
            name: "Add Post",
            slug: "/add-post",
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
        <header className="bg-amber-400 py-4">
            <Container>
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className='text-xl font-semibold text-white'>
                        <Link to="/">Logo</Link>
                    </div>

                    {/* Navigation Menu */}
                    <nav>
                        <ul className="flex gap-6">
                            {navItems.map((item) => 
                                item.active ? (
                                    <li key={item.name}>
                                        <Link
                                            to={item.slug}
                                            className="text-white hover:text-amber-600 transition duration-300"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ) : null
                            )}

                            {/* Show Logout button when user is authenticated */}
                            {authStatus && (
                                <li>
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </Container>
        </header>
    );
}

export default Header;
