import React, { useState, useContext } from 'react';
import './Search.css';
import { StoreContext } from '../Context/ShopContext';
import FoodDisplay from '../FoodDisplay/FoodDisplay';

const Search = () => {
    const { food_list } = useContext(StoreContext);
    const [searchName, setSearchName] = useState('');
    const [searchCategory, setSearchCategory] = useState('All');

    return (
        <div className="search-container">
            <input 
                type="text" 
                placeholder="Search by name..." 
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
            />
            <select 
                value={searchCategory} 
                onChange={(e) => setSearchCategory(e.target.value)}
            >
                <option value="All">All Categories</option>
                {/* Add other categories dynamically if needed */}
                <option value="Category1">Category 1</option>
                <option value="Category2">Category 2</option>
                <option value="Category3">Category 3</option>
            </select>
            <FoodDisplay food_list={food_list} searchName={searchName} searchCategory={searchCategory} />
        </div>
    );
};

export default Search;
