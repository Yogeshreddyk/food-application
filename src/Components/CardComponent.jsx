import { IMAGE_URL } from "../Utils/constants";

export const CardComponent = (props) => {
  const { info } = props?.resData?.card?.card;

  return (
    <div className="m-2 p-2 w-[250px] bg-gray-100 hover:bg-slate-300 border border-solid rounded-m shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <img
        src={IMAGE_URL + info?.cloudinaryImageId}
        alt="res-logo"
        className="px-0.5 object-cover w-80 h-60  rounded-lg"
      />
      <h3 className="font-bold py-3 text-xl">{info?.name}</h3>
      <h4 className="font-light">{info?.cuisines.slice(0, 4).join(", ")}</h4>
      <h4 className="font-light">{info?.avgRating} Stars</h4>
      <h4 className="font-light">{info?.sla?.deliveryTime} minutes</h4>
    </div>
  );
};

export const withPromotedCard = (CardComponent) => {
  return (props) => {
    return (
      <div className="relative">
        <div className="absolute  bg-black text-white rounded-lg px-2 py-1 z-20">
          Promoted
        </div>
        <CardComponent {...props} />
      </div>
    );
  };
};

export default CardComponent;
