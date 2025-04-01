import { useEffect, useState } from 'react';
import './FoodDisplay.css';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const [foodList, setFoodList] = useState([]);

    useEffect(() => {
        // Fetch dữ liệu từ API
        fetch('http://localhost:8081/food/foods')
            .then(response => response.json())
            .then(data => {
                if (data.code === 1000) {
                    setFoodList(data.result);  // Lưu dữ liệu vào state
                }
            })
            .catch(error => console.log("Error fetching data:", error));
    }, []);
    console.log(foodList);
    return (
        <div className='food-display' id='food-display'> 
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {Array.isArray(foodList) && foodList.length > 0 ? (
                    foodList.map((item, index) => {
                        if (category === "All" || category === item.category) {
                            return (
                                <FoodItem 
                                    key={index}
                                    id={item.id}  
                                    name={item.name}
                                    price={item.price}
                                    image={item.image}
                                />
                            );
                        }
                        return null;
                    })
                ) : (
                    <div>No dishes available.</div>  
                )}
            </div>
        </div>
    );
}

export default FoodDisplay;
