import React, { useState } from 'react'
import Navbar from '../components/Navbar'

const AddProduct = () => {
    const [ProductName, setProductName] = useState("");
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("");
    const [costPrice, setCostPrice] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [PurchaseDate, setPurchaseDate] = useState()
    const [expiryDate, setExpiryDate] = useState();
    const [SupplierName, setSupplierName] = useState("");
    return (
        <div>
            <Navbar />
            <div className='flex itmes-center justify-center font-bold text-3xl mt-5 text-pink-500'>
                <p className='underline'>Product Addition Form</p>
            </div>
            <div className='md:mx-60 mx-4 my-10'>
                <div className='flex items-center justify-center '>
                    <div className='border-2 border-pink-500 md:w-1/4 w-1/3 md:h-10 h-16 flex items-center justify-center'>
                        Product Name
                    </div>
                    <input type="text" value={ProductName} onChange={(e) => setProductName(e.target.value)} className='outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center' />
                </div>
                <div className='flex items-center justify-center text-center'>
                    <div className='border-2 border-pink-500 md:w-1/4 w-1/3 md:h-10 h-16 flex items-center justify-center'>
                        Product Category
                    </div>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className='outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center' />
                </div>

                <div className='flex  items-center justify-center text-center'>
                    <div className='border-2 border-pink-500 md:w-1/4 w-1/3 md:h-10 h-16 flex items-center justify-center'>
                        Product Description
                    </div>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className='outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center' />
                </div>
                <div className='flex  items-center justify-center text-center'>
                    <div className='border-2 border-pink-500 md:w-1/4 w-1/3 md:h-10 h-16 flex items-center justify-center'>
                        Product Cost Price
                    </div>
                    <input type="text" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} className='outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center' />
                </div>
                <div className='flex items-center justify-center text-center'>
                    <div className='border-2 border-pink-500 md:w-1/4 w-1/3 md:h-10 h-16 flex items-center justify-center'>
                        Product Selling Price
                    </div>
                    <input type="text" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} className='outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center' />
                </div>
                <div className='flex  items-center justify-center text-center'>
                    <div className='border-2 border-pink-500 md:w-1/4 w-1/3 md:h-10 h-16 flex items-center justify-center'>
                        Product Purchase Date
                    </div>
                    <input type="date" value={PurchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} className='outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center' />
                </div>
                <div className='flex  items-center justify-center text-center'>
                    <div className='border-2 border-pink-500 md:w-1/4 w-1/3 md:h-10 h-16 flex items-center justify-center'>
                        Product Expiry Date
                    </div>
                    <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className='outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center' />
                </div>
                <div className='flex  items-center justify-center text-center'>
                    <div className='border-2 border-pink-500 md:w-1/4 w-1/3 md:h-10 h-16 flex items-center justify-center'>
                        Product Supplier Name
                    </div>
                    <input type="text" value={SupplierName} onChange={(e) => setSupplierName(e.target.value)} className='outline-none border-2 border-pink-500 flex items-center justify-center md:h-10 h-16 md:w-3/4 w-2/3 text-center' />
                </div>
                <div className='flex items-center justify-end mx-2 my-5 gap-5 '>
                    <button className='border-2 border-pink-500 px-1 py-1 rounded-lg'>Add Product</button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct
