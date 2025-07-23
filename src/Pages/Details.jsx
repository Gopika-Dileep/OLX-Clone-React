import Navbar from "../Components/Navbar/Navbar"
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useItems } from '../Components/Context/ItemContext';
import Login from "../Components/Modal/Login";
import Sell from "../Components/Modal/Sell";
import { FaRegHeart, FaHeart, FaShareAlt } from 'react-icons/fa';

const Details = () => {
    const location = useLocation();
    const { item } = location.state || {};

    const [openModal, setModal] = useState(false);
    const [openModalSell, setModalSell] = useState(false);
    const [fav, setFav] = useState(false);
    const [showNumber, setShowNumber] = useState(false);
    const { setItems } = useItems();

    const toggleModal = () => setModal(!openModal);
    const toggleModalSell = () => setModalSell(!openModalSell);
    // Use createAt as stored (e.g., 'Mon Jul 21 2025')
    const date = item?.createAt ? new Date(item.createAt).toDateString() : 'Unknown';
    const sellerName = item?.userName || 'Ace Cars Expert';
    const sellerAvatar = item?.imageUrl || 'https://via.placeholder.com/48';

    return (
        <>
        <div className="min-h-screen bg-gray-50">
            <Navbar toggleModalSell={toggleModalSell} toggleModal={toggleModal} />
            <Login toggleModal={toggleModal} status={openModal} />

            <div className="bg-white shadow-md p-4 mb-16">

            </div>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-2">
                {/* Left: Image */}
                <div className="md:col-span-2 bg-white rounded-lg shadow p-4 flex justify-center items-center min-h-[350px] x">
                    <img className="object-contain max-h-[400px] w-full" src={item?.imageUrl} alt={item?.title} />
                </div>
                {/* Right: Info Card */}
                <div className="col-span-1 flex flex-col gap-4">
                    {/* Price Card */}
                    <div className="bg-white rounded-lg shadow p-5 relative">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-3xl font-bold text-green-700 mb-1">₹ {item?.price || '1,46,99,000'}</p>
                                <div className="flex gap-2 text-gray-500 text-sm mb-1">
                                    <p>{item?.category}</p>
                                </div>
                                <p className="text-lg text-gray-800 font-semibold mb-1">{item?.title || 'Toyota Land Cruiser LC 200 VX, 2019, Diesel'}</p>
                                <p className="text-sm text-gray-500 mb-2">{item?.description || 'No description provided.'}</p>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <button onClick={() => setFav(f => !f)} aria-label="Favorite">
                                    {fav ? <FaHeart className="text-red-500 text-2xl" /> : <FaRegHeart className="text-gray-400 text-2xl" />}
                                </button>
                                <button aria-label="Share">
                                    <FaShareAlt className="text-gray-400 text-xl" />
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-400">{date}</span>
                        </div>
                    </div>
                    {/* Seller Card */}
                    <div className="bg-white rounded-lg shadow p-5 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full object-cover border" src={sellerAvatar} alt="Seller" />
                            <div>
                                <p className="font-bold text-gray-800">{sellerName}</p>
                                <p className="text-xs text-gray-500">No mutual friends</p>
                            </div>
                        </div>
                        <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700 transition-colors text-base">CHAT WITH SELLER</button>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-xl"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 5a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                            <span className="text-gray-700 font-semibold text-base">{showNumber ? '98XX-XXXXXX' : '•• •••• ••••'}</span>
                            <button className="text-blue-600 underline ml-2 text-sm" onClick={() => setShowNumber(s => !s)}>{showNumber ? 'Hide number' : 'Show number'}</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="max-w-5xl mx-auto mt-8 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    <div>
                        <span className="font-semibold">Title: </span>{item?.title || 'Toyota Land Cruiser LC 200 VX'}
                    </div>
                    <div>
                        <span className="font-semibold">Category: </span>{item?.category || 'Cars'}
                    </div>
                    <div>
                        <span className="font-semibold">Price: </span>₹ {item?.price || '1,46,99,000'}
                    </div>
                    <div className="col-span-2">
                        <span className="font-semibold">Description: </span>{item?.description || 'No description provided.'}
                    </div>
                </div>
            </div>

            <Sell setItems={setItems} toggleModal={toggleModalSell} status={openModalSell} />
        </div>
        </>
    );
};

export default Details