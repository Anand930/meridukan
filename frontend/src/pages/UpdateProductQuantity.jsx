import React from 'react'
import UpdateDetailsComponents from '../components/UpdateDetailsComponent'

const UpdateProductQuantity = () => {
  return (
    <div><UpdateDetailsComponents apiRoute={'updatequantity'} updatedField={'Available Quantity'} UpdatingFieldNameInDB={'availableQuantity'}/></div>
  )
}

export default UpdateProductQuantity