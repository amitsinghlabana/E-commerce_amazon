import React from "react";
import Image from "next/image";
import { MinusSmIcon, PlusIcon, StarIcon, TrashIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket, removeGroupedFromBasket } from "../slices/basketSlice";



function CheckoutProduct({
  id,
  title,
  price,
  rating,
  description,
  category,
  image,
  hasPrime,
  quantity,
}) {
  const total = price * 50 * quantity;

  const dispatch = useDispatch();
  
  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };
    //Push item into redux
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
      //Remove item from redux
      dispatch(removeFromBasket({ id }));
  };

  function removeGroupFromBasket() {
    dispatch(removeGroupedFromBasket({ id }));
}

  return (
    <div className="grid grid-cols-5 p-3 border-b">
      <Image src={image} height={200} width={200} objectFit="contain" />

      {/* Middle */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-3">{description}</p>
          {quantity} × <Currency quantity={price * 50} currency="INR" /> ={" "}
          <span>
            <Currency quantity={total} currency="INR" />
          </span>

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      {/* Right add & remove buttons */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        {/* <button onClick={addItemToBasket} className="button">
          Add to Cart
        </button> */}
        <div className="flex justify-between xs:justify-start">
                    <button
                        className="button my-1"
                        onClick={removeItemFromBasket}>
                        <MinusSmIcon className="h-3 text-black" />
                    </button>
                    <div className="p-1 m-1 whitespace-normal sm:p-1 sm:whitespace-nowrap">
                        <span className="font-bold">{quantity}</span>
                    </div>
                    <button className="button my-1 " onClick={addItemToBasket}>
                        <PlusIcon className="h-3 text-black" />
                    </button>
          </div>
        

                
        {/* <button onClick={removeGroupFromBasket} className="p-2 bg-gradient-to-b from-yellow-200 to-yellow-400 border border-yellow-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-yellow-500 active:from-yellow-500 justify-center  line-clamp-1"> */}
          {/* Remove from Cart */}
          <TrashIcon onClick={removeGroupFromBasket} className="h-8 text-yellow-500 cursor-pointer hover:text-yellow-600 items-center justify-center" />
        {/* </button> */}
      </div>

     
    </div>



  );
}

export default CheckoutProduct;
