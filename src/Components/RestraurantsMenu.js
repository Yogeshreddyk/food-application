import React, { useState } from "react";
import { Shimmer } from "./Shimmer";
import { useParams } from "react-router-dom";
import { useRestaurantMenu } from "../Utils/useRestraurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useDispatch } from "react-redux";
import { getResInfo } from "../Utils/Slices/RestraurantInfo";

const RestraurantsMenu = () => {
  const { id } = useParams();
  const [showIndex, setShowIndex] = useState(0);
  const dispatch = useDispatch();

  const menuData = useRestaurantMenu(id);
  if (menuData === null)
    return (
      <div className="min-h-screen flex flex-col">
        <Shimmer className="flex-grow" />
      </div>
    );

  const { name, cuisines, costForTwoMessage, totalRatingsString, areaName } =
    menuData?.cards[2]?.card?.card?.info;
  dispatch(getResInfo(menuData?.cards[2]?.card?.card?.info));

  const categories =
    menuData?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (e) =>
        e.card?.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div>
      <div className="text-center">
        <h1 className="font-bold my-6 text-2xl">{name}</h1>
        <p className="font-bold text-lg">{cuisines?.join(" , ")}</p>
        <div className="w-8/12 mx-auto my-4 bg-slate-100 shadow-xl p-4 rounded-lg">
          <div className="font-semibold text-m  flex justify-between">
            <p>
              ⭐️{menuData?.cards[2]?.card?.card?.info?.avgRating}(
              {totalRatingsString}) - {costForTwoMessage}
            </p>
            <p>
              ⏱️ {menuData?.cards[2]?.card?.card?.info?.sla?.minDeliveryTime} -{" "}
              {menuData?.cards[2]?.card?.card?.info?.sla?.maxDeliveryTime} mins
            </p>
          </div>
          <div className="font-semibold text-m  text-left">
            <p>🏨 Outlet: {areaName}</p>
          </div>
        </div>
        <ul>
          {categories?.map((item, index) => (
            <RestaurantCategory
              key={item?.card?.card?.title}
              data={item?.card?.card}
              showIndex={index === showIndex ? true : false}
              setShowIndex={() => setShowIndex(index)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestraurantsMenu;
