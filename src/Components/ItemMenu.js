import React from "react";
import { IMAGE_URL } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../Utils/Slices/cartSlice";

const ItemMenu = ({ items }) => {
  const dispatch = useDispatch();

  const handleAdd = (item) => {
    dispatch(addItem(item?.card?.info));
  };
  return (
    <div>
      {items.map((item) => (
        <div
          key={item?.card?.info?.id}
          className="p-2 m-3 border-b-2 border-gray-200 text-left text-l"
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col max-w-[75%]">
              <div className="flex items-center">
                <span className="p-0.5">
                  {item?.card?.info?.isVeg ? <>🟢</> : <>🔴</>}
                </span>
                <div className="ml-2">
                  <span className="font-bold">{item?.card?.info?.name} -</span>
                  <span className="ml-2">
                    ₹
                    {item?.card?.info?.price
                      ? item?.card?.info?.price / 100
                      : item?.card?.info?.defaultPrice / 100}
                  </span>
                </div>
              </div>

              {item?.card?.info?.description && (
                <p className="mt-1 text-sm font-light text-gray-600">
                  {item?.card?.info?.description}
                </p>
              )}
            </div>

            {item?.card?.info?.imageId && (
              <div className="w-25 h-24 ml-4 flex-shrink-0 border-2 border-gray-700 shadow-sm rounded-md relative transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <img
                  src={IMAGE_URL + item?.card?.info?.imageId}
                  alt={item?.card?.info?.name}
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute  top-[-10] right-[-20] px-2 py-1 text-sm font-medium rounded-md shadow-md bg-white opacity-1"
                  onClick={() => handleAdd(item)}
                >
                  Addᐩ
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemMenu;
