import React from 'react'
import UpdateDetailsComponents from '../../components/UpdateDetailsComponent'

const UpdateDescription = () => {
  return (
    <div className='bg-gray-50'><UpdateDetailsComponents apiRoute={'/updatedescription'} updatedField={'Product Description'} UpdatingFieldNameInDB={'description'}/></div>
  )
}

export default UpdateDescription