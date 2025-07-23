import './Navbar.css'
import logo from '../../assets/symbol.png'
import search from '../../assets/search.svg'
import arrow from '../../assets/arrow-down.svg'
import searchchwt from '../../assets/search.svg'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../Firebase/Firebase'
import addBtn from '../../assets/addButton.png'
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItems } from '../Context/ItemContext';

function Navbar(props) {
    const [user] = useAuthState(auth)
    const { toggleModal, toggleModalSell } = props
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef();
    const { setSearchQuery, setLocationQuery } = useItems();
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await auth.signOut();
        setDropdownOpen(false);
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (e.key === 'Enter' && query.trim()) {
            navigate('/search');
        }
    };

    const handleLocationSearch = (e) => {
        setLocationQuery(e.target.value);
    };

    return (
        <div>
            <nav className='fixed z-50 w-full overflow-visible p-2 pl-3 pr-3 shadow-md bg-slate-100 border-solid border-b-white'>
                <img
                    src={logo}
                    alt=''
                    className='w-12 cursor-pointer'
                    onClick={() => navigate('/')}
                />

                <div className='relative location-search ml-5 '>
                    <img src={search} alt='' className='absolute top-4 left-2 w-5' />
                    <input placeholder='Search city, area, or locality...'
                        className='w-[50px] sm:w-[150px] md:w-[250px] lg:w-[270px] p-3 pl-8 pr-8 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300'
                        type="text"
                        onChange={handleLocationSearch}
                    />
                </div>

                <div className='ml-5 mr-2 relative w-full main-search'>

                    <input placeholder='Find Cars, Mobile phones, and More...'
                        className='w-full p-3 border-black border-solid border-2 rounded-md placeholder:text-ellipsis focus:outline-none focus:border-teal-300'
                        type='text'
                        onChange={handleSearch}
                        onKeyUp={handleSearch}
                    />

                    <div
                        onClick={() => navigate('/search')}
                        style={{ backgroundColor: '#002f34' }}
                        className='flex justify-center items-center absolute top-0 right-0 h-full rounded-e-md w-12 cursor-pointer'
                    >
                        <img className='w-5 filter invert' src={searchchwt} alt='Search Icon' />

                    </div>
                </div>

                <div className='mx-1 sm:ml-5 sm:mr-5 relative lang'>
                    <p className='font-bold mr-3'>English</p>
                    <img src={arrow} alt='' className='w-5 cursor-pointer' />
                </div>
                {!user ? (
                    <p className='font-bold underline ml-5 cursor-pointer' onClick={toggleModal}  style={{ color: '#002f34' }}>Login</p>
                ) : (
                    <div className='relative' ref={dropdownRef}>
                        <p
                            style={{ color: '#002f34' }}
                            className='font-bold ml-5 cursor-pointer select-none'
                            onClick={() => setDropdownOpen((open) => !open)}
                        >
                            {user.displayName?.split(' ')[0]}
                        </p>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
                                <button
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <img src={addBtn}
                    onClick={user ? toggleModalSell : toggleModal}
                    className='w-24 mx-1 sm:ml-5 sm:mr-5 shadow-xl rounded-full cursor-pointer'
                    alt="" />
            </nav>

        </div>
    )
}


export default Navbar