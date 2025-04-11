import React, { useContext, useEffect} from "react";
import Slider from "./Slider";
import { UserContext } from "../context/UserContext";



const ProductSlide = ({ categoryName }) => {
  // const [productSampleCategorywise, setProductSampleCategorywise] = useState([]);
  

  const { products, handleProduct } = useContext(UserContext);


  useEffect(() => {
    handleProduct()
  }, []);

  let Categories = [];
  products.map((item) => Categories.push(item.categories));

  const productSampleCategorywise = products.filter(
    (item) => item.categories === categoryName
  );

  // console.log("productSamepleCategorywiese", productSampleCategorywise);

  return (
    <div>
      <h1 className="flex justify-start items-center px-5 mt-6 text-2xl font-bold text-pink-600 cursor-pointer ">
        {categoryName}
      </h1>
      <div className="my-2 px-5">
        <Slider item={productSampleCategorywise} />
      </div>
    </div>
  );
};

export default ProductSlide;

