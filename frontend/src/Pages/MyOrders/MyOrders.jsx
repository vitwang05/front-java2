import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../Components/Context/ShopContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrders = () => {

    const {url,token} = useContext(StoreContext)
    const [data,setData] = useState([])

    const fetchOrders = async()=>{
        const response = await axios.get(url+'order/getAllOrder')
        setData(response.data.result)
    }

    useEffect(()=>{
        if (token) {
            fetchOrders()
        }
    },[token])
    console.log(data)

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.reverse().map((order, index) => (
                    <div key={index} className='my-orders-order'>
                        <img src={assets.parcel_icon} alt="" />
                        <p>
                            {order.orderItems.map((item, i) => (
                                i === order.orderItems.length - 1
                                    ? `${item.foodName} x ${item.quantity}`
                                    : `${item.foodName} x ${item.quantity}, `
                            ))}
                        </p>
                        <p>${order.amount ? order.amount.toFixed(2) : "N/A"}</p>
                        <p>Items: {order.orderItems.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button onClick={fetchOrders}>Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    );
    
}

export default MyOrders
