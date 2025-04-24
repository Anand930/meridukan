import React from "react";
import UpdateDetailsComponents from "../../components/UpdateDetailsComponent";

const UpdateSellingPrice = () => {
  return (
    <div className="bg-gray-50 min-h-full">
      <UpdateDetailsComponents apiRoute={'updatesellingprice'} updatedField={'selling price'} UpdatingFieldNameInDB={'sellingPrice'} />
    </div>
  );
};

export default UpdateSellingPrice;
