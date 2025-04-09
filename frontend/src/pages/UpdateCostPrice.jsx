import React from 'react'
import UpdateDetailsComponents from '../components/UpdateDetailsComponent'

const UpdateCostPrice = () => {
  return (
    <div><UpdateDetailsComponents apiRoute={'updatecostprice'} updatedField={'Cost Price'} UpdatingFieldNameInDB={'costPrice'}/></div>
  )
}

export default UpdateCostPrice;