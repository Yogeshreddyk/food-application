import React from "react";
import ItemMenu from "./ItemMenu";

const RestaurantCategory = ({ data, showIndex, setShowIndex }) => {
  const handleShow = () => {
    setShowIndex();
  };

  return (
    <div className="w-8/12 mx-auto my-4 bg-slate-100 shadow-xl p-4 rounded-lg">
      <div className="flex justify-between" onClick={handleShow}>
        <span className="font-bold text-lg m-1">
          {data?.title}({data?.itemCards?.length}){" "}
        </span>
        <span className="m-1">⬇ </span>
      </div>

      {showIndex && <ItemMenu items={data?.itemCards} />}
    </div>
  );
};

export default RestaurantCategory;
