import React from 'react'
import cheetos from '/cheetos.png'

const Card = ({ item }) => {
    return (
        <div>
            <div className='border-2 border-pink-500 px-2 py-4 rounded-lg cursor-pointer'>
                <div className='flex items-center justify-center '>
                    <p className='font-semibold pb-4'>{item.name}</p>
                </div>
                <img src={cheetos} alt="" />
                <div className=''>
                    <p className='flex justify-center pt-2 font-bold'><span className='border-pink-500' ></span>${item.sellingPrice}</p>
                </div>
            </div>
        </div>
    )
}

export default Card
