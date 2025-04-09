import React from "react";
import UpdateDetailsComponents from "../components/UpdateDetailsComponent";

const UpdateSellingPrice = () => {
  return (
    <div>
      <UpdateDetailsComponents apiRoute={'updatesellingprice'} updatedField={'selling price'} UpdatingFieldNameInDB={'sellingPrice'} />
    </div>
  );
};

export default UpdateSellingPrice;
