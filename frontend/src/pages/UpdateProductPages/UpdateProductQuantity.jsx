import React from 'react'
import UpdateDetailsComponents from '../../components/UpdateDetailsComponent'

const UpdateProductQuantity = () => {
  return (
    <div className='bg-gray-50 min-h-full'><UpdateDetailsComponents apiRoute={'updatequantity'} updatedField={'Available Quantity'} UpdatingFieldNameInDB={'availableQuantity'}/></div>
  )
}

export default UpdateProductQuantity