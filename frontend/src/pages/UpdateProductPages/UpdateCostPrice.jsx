import React from 'react'
import UpdateDetailsComponents from '../../components/UpdateDetailsComponent'

const UpdateCostPrice = () => {
  return (
    <div className='bg-gray-50 min-h-screen'><UpdateDetailsComponents apiRoute={'updatecostprice'} updatedField={'Cost Price'} UpdatingFieldNameInDB={'costPrice'}/></div>
  )
}

export default UpdateCostPrice;