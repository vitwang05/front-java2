import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify';

const List = ({url}) => {

    const [list, setList] = useState([])

    const fetchList = async () => {
        const response = await axios.get(`http://localhost:8081/food/foods`)
        console.log(response.data)
        if (response.data.code === 1000) {
            setList(response.data.result)
        }
        else {
            toast.error("Error")
        }
    }

   const removeFood = async (id) => {
        console.log("Deleting food ID:", id);
        const response = await axios.delete(`http://localhost:8081/food/foods/${id}`)
        if (response.data.code === 1000) {
            toast.success(response.data.message)
            await fetchList();
            window.location.reload();
        } else {
            toast.error("Error")
        }
    }


    useEffect(() => {
        fetchList()
    }, [])
    console.log(list)
    return (
        <div className='list add flex-col'>
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={index} className='list-table-format'>
                            <img src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                            <p onClick={() => removeFood(item.id)} className='cussor'>X</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List
