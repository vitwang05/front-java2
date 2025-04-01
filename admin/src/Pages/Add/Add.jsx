import React, { useState } from 'react';
import './Add.css';
import { toast } from 'react-toastify';
import axios from 'axios';

const Add = ({ url }) => {
    const [imageUrl, setImageUrl] = useState("");
    const [data, setData] = useState({
        name: "",
        price: "",
        category: "Salad"
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = {
            name: data.name,
            price: Number(data.price),
            category: data.category,
            image: imageUrl 
        };

        try {
            const response = await axios.post(`http://localhost:8081/food/foods`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    price: "",
                    category: "Salad"
                });
                setImageUrl("");
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to add product");
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Image URL</p>
                    <input 
                        type="text" 
                        placeholder="Enter image URL" 
                        value={imageUrl} 
                        onChange={(e) => setImageUrl(e.target.value)} 
                        required
                    />
                    {imageUrl && <img src={imageUrl} alt="Preview" className="image-preview" />}
                </div>
                <div className="add-product-name">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' required />
                </div>
                
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category" value={data.category}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='$20' required />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    );
};

export default Add;
