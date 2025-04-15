import React from 'react'
import UpdateDetailsComponents from '../../components/UpdateDetailsComponent'

const UpdateDescription = () => {
  return (
    <div><UpdateDetailsComponents apiRoute={'/updatedescription'} updatedField={'Product Description'} UpdatingFieldNameInDB={'description'}/></div>
  )
}

export default UpdateDescription