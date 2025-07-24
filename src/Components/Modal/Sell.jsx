import { useState } from "react"
import Input from "../Input/Input"
import { UserAuth } from "../Context/Auth"
import { addDoc, collection } from "firebase/firestore"
import { fetchFromFireStore, fireStore } from "../Firebase/Firebase"
import fileUpload from '../../assets/fileUpload.svg'
import loading from '../../assets/loading.gif'
import close from '../../assets/close.svg'

const Sell = (props) => {
    const { toggleModalSell, status, setItems } = props

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [submitting, setSubmitting] = useState(false)
    const auth = UserAuth();

    const handleImageUpload = (event) => {
        if (event.target.files) setImage(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!auth?.user) {
            alert('Please login to continue');
            return;
        }
        setSubmitting(true)
        const readImageAsDataUrl = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const imageUrl = reader.result
                    localStorage.setItem(`image_${file.name}`, imageUrl)
                    resolve(imageUrl)
                }
                reader.onerror = reject
                reader.readAsDataURL(file)
            })
        }
        let imageUrl = '';
        if (image) {
            try {
                imageUrl = await readImageAsDataUrl(image)
            } catch (error) {
                console.log(error)
                alert('falied to read image');
                return;
            }
        }
        const trimmedTitle = title.trim();
        const trimmedCategory = category.trim();
        const trimmedPrice = price.trim();
        const trimmedDescription = description.trim();
        if (!trimmedTitle || !trimmedCategory || !trimmedPrice || !trimmedDescription) {
            alert('All fields are required');
            setSubmitting(false)
            return;
        }
        
        try {
            await addDoc(collection(fireStore, 'products'), {
                title,
                category,
                price,
                description,
                imageUrl,
                userId: auth.user.uid,
                userName: auth.user.displayName || 'Anonymous',
                createAt: new Date().toISOString(),
            });
            setImage(null);
            const datas = await fetchFromFireStore();
            setItems(datas)
            toggleModalSell();
        } catch (error) {
            console.log(error);
            alert('failed to add items to the firestore')
        } finally {
            setSubmitting(false)
        }
    }

    if (!status) return null;
    return (
        <div className="custom-modal-overlay">
            <div className="custom-modal-box">
                {/* Header (fixed) */}
                <div className="custom-modal-header">
                    <h3 className="text-xl font-medium text-gray-900">Sell Item</h3>
                    <img
                        onClick={toggleModalSell}
                        className="w-5 h-5 absolute top-5 right-5 cursor-pointer"
                        src={close}
                        alt="Close"
                    />
                </div>
                {/* Content (scrollable, hide scrollbar) */}
                <div className="custom-modal-content">
                    <Input setInput={setTitle} placeholder='Title' />
                    <Input setInput={setCategory} placeholder='category' />
                    <Input setInput={setPrice} placeholder='Price' />
                    <Input setInput={setDescription} placeholder='Description' />
                    <div className="pt-2 w-full relative">
                        {image ? (
                            <div className="relative h-40 sm:h-60 w-full flex justify-center border-2 border-black border-solid rounded-md overflow-hidden">
                                <img className="object-contain" src={URL.createObjectURL(image)} alt="" />
                            </div>
                        ) : (
                            <div className="relative h-40 sm:h-60 w-full border-2 border-black border-solid rounded-md">
                                <input
                                    onChange={handleImageUpload}
                                    type="file"
                                    className="absolute inset-10 h-full w-full opacity-0 cursor-pointer z-30"
                                    required
                                />
                                <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
                                    <img className="w-12" src={fileUpload} alt="" />
                                    <p className="text-center text-sm pt-2">Click to upload images</p>
                                    <p className="text-center text-sm pt-2">SVG, PNG, JPG</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* Footer (fixed) */}
                <div className="custom-modal-footer">
                    {submitting ? (
                        <div className="w-full flex h-14 justify-center items-center">
                            <img className="w-32 object-cover" src={loading} alt="" />
                        </div>
                    ) : (
                        <button
                            className="w-full h-[40px] rounded bg-[#002f34] text-white font-semibold hover:bg-[#01444b] transition-colors"
                            onClick={handleSubmit}
                        >
                            Sell Item
                        </button>
                    )}
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
                        display: flex;
                        flex-direction: column;
                        padding-bottom: 0;
                    }
                    .custom-modal-header {
                        position: sticky;
                        top: 0;
                        background: #fff;
                        z-index: 2;
                        padding: 1rem 1rem 1rem 1rem;
                        border-bottom: 1px solid #e5e7eb;
                        border-top-left-radius: 16px;
                        border-top-right-radius: 16px;
                        min-height: 56px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    .custom-modal-header img {
                        position: absolute;
                        right: 20px;
                        top: 20px;
                    }
                    .custom-modal-content {
                        flex: 1 1 auto;
                        overflow-y: auto;
                        padding: 1rem;
                        /* Hide scrollbar for Chrome, Safari and Opera */
                        scrollbar-width: none; /* Firefox */
                        -ms-overflow-style: none;  /* IE and Edge */
                    }
                    .custom-modal-content::-webkit-scrollbar {
                        display: none;
                    }
                    .custom-modal-footer {
                        position: sticky;
                        bottom: 0;
                        background: #fff;
                        z-index: 2;
                        padding: 1rem;
                        border-top: 1px solid #e5e7eb;
                        border-bottom-left-radius: 16px;
                        border-bottom-right-radius: 16px;
                    }
                    @media (max-width: 500px) {
                        .custom-modal-box {
                            width: 98vw;
                            min-width: unset;
                            border-radius: 8px;
                        }
                        .custom-modal-header, .custom-modal-footer {
                            border-radius: 8px 8px 0 0;
                        }
                    }
                `}</style>
            </div>
        </div>
    )
}

export default Sell