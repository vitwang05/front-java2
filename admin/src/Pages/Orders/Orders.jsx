import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
    const [orders, setOrders] = useState([]);

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(`http://localhost:8081/food/order/getAllOrder`);
            if (response.data.code === 1000) {
                setOrders(response.data.result);
            } else {
                toast.error("Error fetching orders");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Error fetching orders");
        }
    };

    const statusHandler = async(event, orderId) => {
        try {
            const response = await axios.post(`http://localhost:8081/food/order/update?id=${orderId}&status=${event.target.value}`);
            if (response.data.code === 1000) {
                await fetchAllOrders();
            }
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Error updating status");
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className='order add'>
            <h3>Order Page</h3>
            <div className="order-list">
                {orders.length > 0 ? (
                    orders.slice().reverse().map((order) => (
                        <div key={order.id} className="order-item">
                            <img src={assets.parcel_icon} alt="Parcel Icon" />
                            <div>
                                <p className="order-item-food" style={{ fontWeight: 'bold' }}>
                                    {order.orderItems.map((item, itemIndex) => (
                                        <span key={itemIndex}>
                                            {item.foodName} x {item.quantity}
                                            {itemIndex !== order.orderItems.length - 1 ? ", " : ""}
                                        </span>
                                    ))}
                                </p>
                                <p className='order-item-name' style={{ fontWeight: 'bold' }}>{order.address}</p>
                            </div>
                            <p>Total Items: {order.orderItems.length}</p>
                            <p>${order.orderItems.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
                            <select onChange={(event) => statusHandler(event, order.id)} value={order.status}>
                                <option value="Food Processing">Food Processing</option>
                                <option value="Out for delivery">Out for delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    ))
                ) : (
                    <p>No orders available</p>
                )}
            </div>
        </div>
    );
};

export default Orders;
