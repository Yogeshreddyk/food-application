import { useSelector } from "react-redux";
import { IMAGE_URL } from "../Utils/constants";
import { useDispatch } from "react-redux";
import { clearCart, removeItem } from "../Utils/Slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const cartData = useSelector((store) => store?.cart?.items);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart(0));
  };
  const handleRemove = (itemMenu) => {
    const itemToBeRemoved = cartData.filter(
      (item) => item?.id === itemMenu?.id
    );

    dispatch(removeItem(itemToBeRemoved));
  };

  const handlePlaceOrder = () => {
    navigate("/placeOrder");
  };
  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-8/12 mx-auto my-4 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="font-bold my-6 text-2xl">{"Items added to Cart"}</h1>
          <div className="ml-auto flex space-x-4">
            <button
              className={`px-4 py-2 border border-gray-600 rounded-md ${
                cartData?.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            <button
              className={`px-4 py-2 border border-green-600 rounded-md ${
                cartData?.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
              onClick={cartData?.length === 0 ? undefined : handlePlaceOrder} 
              disabled={cartData?.length === 0} 
            >
              View Order Summary
            </button>
        
          </div>
        </div>
      </div>

      <div className="w-8/12 mx-auto my-4 bg-slate-100 shadow-xl p-4 rounded-lg">
        <div className="font-semibold text-m">
          {cartData.length > 0 ? (
            cartData?.map((item) => {
              return (
                <div
                  key={item?.id}
                  className="p-2 m-3 border-b-2 border-gray-200 text-left text-l"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col max-w-[75%]">
                      <div className="flex items-center">
                        <span className="p-0.5">
                          {item?.isVeg ? <>🟢</> : <>🔴</>}
                        </span>
                        <div className="ml-2">
                          <span className="font-bold">{item?.name} -</span>
                          <span className="ml-2">
                            ₹
                            {item?.price
                              ? item?.price / 100
                              : item?.defaultPrice / 100}
                          </span>
                        </div>
                      </div>

                      {item?.description && (
                        <p className="mt-1 text-sm font-light text-gray-600">
                          {item?.description}
                        </p>
                      )}
                    </div>

                    {item?.imageId && (
                      <div className="w-25 h-24 ml-4 flex-shrink-0 border-2 border-gray-700 shadow-sm rounded-md relative transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <img
                          src={IMAGE_URL + item?.imageId}
                          alt={item?.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          className="absolute  top-[-10] right-[-20] px-2 py-1 text-sm font-medium rounded-md shadow-md bg-white opacity-1"
                          onClick={() => handleRemove(item)}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-m  text-center">
              Cart is Empty. Add Items to place order
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
