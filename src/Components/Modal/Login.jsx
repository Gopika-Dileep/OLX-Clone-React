import google from '../../assets/google.png'
import mobile from '../../assets/mobile.svg'
import guitar from '../../assets/guita.png'
import love from '../../assets/love.png'
import avatar from '../../assets/avatar.png'
import close from '../../assets/close.svg'
import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../Firebase/Firebase"
import { useState, useEffect } from 'react';

const carouselData = [
    {
        img: guitar,
        text: 'Help us become one of the safest place to buy and sell.'
    },
    {
        img: love,
        text: 'Close deals from the comfort of your home.'
    },
    {
        img: avatar,
        text: 'Keep all your favorites in one place.'
    }
];

const Login = ({ toggleModal, status }) => {
    const [carouselIndex, setCarouselIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCarouselIndex(prev => (prev + 1) % carouselData.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    const handleClick = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            toggleModal();
            console.log('User', result.user);
        } catch (error) {
            console.log(error);
        }
    }
    if (!status) return null;
    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-box">
                <img onClick={toggleModal} className="w-6 absolute z-10 top-4 right-4 cursor-pointer" src={close} alt="Close" />
                <div className="p-6 pl-2 pr-2 bg-white relative">
                    {/* Carousel */}
                    <div className="w-full h-56 pb-5 flex flex-col items-center justify-center relative">
                        <img className="w-24 pb-5" src={carouselData[carouselIndex].img} alt="Carousel" />
                        <p style={{ color: '#002f34' }} className="w-60 sm:w-72 text-center pb-5 font-semibold">{carouselData[carouselIndex].text}</p>
                        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 space-x-3">
                            {carouselData.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`h-2 w-2 rounded-full ${carouselIndex === idx ? 'bg-teal-300' : 'bg-gray-300'}`}
                                    onClick={() => setCarouselIndex(idx)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 pt-0">
                    <div className="flex items-center justify-start rounded-md border-2 border-solid border-black p-5 pl-4 relative h-8 mb-4">
                        <img className="w-6 mr-2" src={mobile} alt="Mobile" />
                        <p className="text-sm font-bold">Continue with phone</p>
                    </div>
                    <div className="flex items-center justify-center rounded-md border-2 border-solid border-gray-300 p-5 relative h-8 cursor-pointer active:bg-teal-100" onClick={handleClick} >
                        <img className="w-7 absolute left-2" src={google} alt="Google" />
                        <p className="text-sm text-gray-500" >Continue with Google</p>
                    </div>
                    <div className="pt-5 flex flex-col items-center justify-center">
                        <p className="font-semibold text-sm">OR</p>
                        <p className="font-bold text-sm pt-3 underline underline-offset-4">Login with Email</p>
                    </div>
                    <div className="pt-3 sm:pt-3 flex flex-col items-center justify-center">
                        <p className="text-xs">All your personal details are safe with us.</p>
                        <p className="text-xs pt-5 text-center">If you continue, you are accepting <span className="text-blue-600">OLX Terms and Conditions and Privacy Policy</span></p>
                    </div>
                </div>
            </div>
            <style>{`
                .custom-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 50;
                }
                .custom-modal-box {
                    position: relative;
                    width: 450px;
                    background: #fff;
                    border-radius: 16px;
                    box-shadow: 0 4px 32px rgba(0,0,0,0.18);
                    max-height: 90vh;
                    overflow-y: auto;
                    padding-bottom: 1rem;
                }
                @media (max-width: 500px) {
                    .custom-modal-box {
                        width: 98vw;
                        min-width: unset;
                        border-radius: 8px;
                    }
                }
            `}</style>
        </div>
    )
}

export default Login