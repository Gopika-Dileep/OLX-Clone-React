import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { fireStore } from "../Firebase/Firebase";
import { ItemsContext } from "./ItemContext";

export const ItemsContextProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [locationQuery, setLocationQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const filteredItems = items.filter(item => {
        if (!item) return false;
        const query = searchQuery.toLowerCase();
        const matches =
            item.title?.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query) ||
            item.category?.toLowerCase().includes(query);
        const matchesLocation = locationQuery
            ? item.location?.toLowerCase().includes(locationQuery.toLowerCase())
            : true;
        const matchesCategory = selectedCategory
            ? item.category?.toLowerCase() === selectedCategory.toLowerCase()
            : true;
        return matches && matchesLocation && matchesCategory;
    });

    useEffect(() => {
        const fetchItemsFromFireStore = async () => {

            try {
                const productsCollection = collection(fireStore, 'products');
                const productsSnapshot = await getDocs(productsCollection);
                const productsList = productsSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setItems(productsList);


            } catch (error) {
                console.log(error, 'error fetching products')
            }
        }
        fetchItemsFromFireStore();
    }, [])

    const value = {
        items,
        setItems,
        searchQuery,
        setSearchQuery,
        locationQuery,
        setLocationQuery,
        selectedCategory,
        setSelectedCategory,
        filteredItems,
    };

    return (
        <ItemsContext.Provider value={value}>
            {children}
        </ItemsContext.Provider>
    );
};