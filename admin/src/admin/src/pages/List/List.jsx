import React, { useState, useEffect } from "react"
import axios from "axios"
import {toast} from "react-toastify"
import "./List.css"

const List = ({url}) => {

    const [list, setList] = useState([])

    const fetchList = async () => {
        const response = await axios.get(`${url}/api/food/list`)
        if(response.data.success) {
            setList(response.data.data);
        } else {
            toast.error("Error")
        }
    }

    useEffect(() => {
        fetchList();
    }, [])

    const removeFood = async (foodId) => {
        const response = await axios.post(`${url}/api/food/remove`, {foodId})
        console.log(response.data)
        if(response.data.success) {
            await fetchList();
            toast.success(response.data.message)
        } else {
            toast.error("Error")
        }
    }

    return (
        <div className="list-add">
            <h1 className="foods-list-heading">All Foods List</h1>
            <div className="list-table flex-col">
                <div className="list-table-format title ">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key = {index} className="list-table-format">
                            <img src = {`${url}/images/` + item.image} />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>₹{item.price}</p>
                            <p onClick={() => removeFood(item._id)}>X</p>
                            </div>
                    )
                })}
            </div>
        </div>
    )
}

export default List