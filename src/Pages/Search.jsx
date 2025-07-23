import { useItems } from '../Components/Context/ItemContext'
import Card from '../Components/Card/Card'
import Navbar from '../Components/Navbar/Navbar'

function Search() {
    const { filteredItems, searchQuery } = useItems();

    return (
        <div>
            <Navbar />
            <div className="pt-20">
                <div className="px-4 py-3 bg-gray-100">
                    <h2 className="text-xl font-semibold">
                        {searchQuery ? `Search results for "${searchQuery}"` : 'All Items'}
                        <span className="text-gray-500 ml-2">
                            ({filteredItems.length} items)
                        </span>
                    </h2>
                </div>
                <Card items={filteredItems} />
            </div>
        </div>
    )
}

export default Search
