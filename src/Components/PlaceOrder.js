import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../Utils/Slices/cartSlice";
import { useDispatch } from "react-redux";

const PlaceOrder = () => {
  const resData = useSelector((store) => store?.restraurant?.resto);
  const cartData = useSelector((store) => store?.cart?.items);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const resInfo = resData[0];
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const handlePlaceOrder = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    navigate("/");
    dispatch(clearCart());
  };
  const totalAmount = cartData.reduce((acc, item) => {
    return (
      acc + ((item?.price || item?.defaultPrice) / 100) * (item?.quantity || 1)
    );
  }, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-8/12 mx-auto my-4 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="font-bold my-6 text-2xl">{"Checkout"}</h1>
          <div className="ml-auto flex space-x-4">
            <button
              className="px-4 py-2 border border-orange-600 rounded-md bg-orange-500 text-white hover:bg-orange-600"
              onClick={handleBack}
            >
              Back
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
              Place Order
            </button>
          </div>
        </div>
      </div>

      <div className="w-8/12 mx-auto my-4 bg-slate-100 shadow-xl p-4 rounded-lg">
        <span className="font-bold block">{resInfo?.name}</span>
        <span className="mt-1 text-sm font-light text-gray-600">
          {resInfo?.areaName}
        </span>
        <div className="font-semibold text-m">
          {cartData.length > 0 ? (
            cartData.map((item) => (
              <div
                key={item?.id}
                className="flex justify-between items-center px-2  my-2  rounded-lg"
              >
                <div className="flex items-center flex-1">
                  <span className="mr-2">
                    {item?.isVeg ? <>🟢</> : <>🔴</>}
                  </span>
                  <span className="font-semibold">{item?.name}</span>
                </div>

                <div className="flex items-center space-x-3 flex-1 justify-center">
                  <span className="px-3 py-1 bg-gray-100 rounded-md">
                    {item?.quantity || 1} {"qty"}
                  </span>
                </div>

                <div className="text-lg font-medium flex-1 text-right">
                  ₹{(item?.price || item?.defaultPrice) / 100}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 py-4">
              Cart is Empty. Add Items to place order
            </p>
          )}
        </div>
        <div className="border-t border-gray-300 mt-1"></div>
        <div className="font-normal text-bold px-2 py-2 m-1">Bill Details:</div>

        <div className="space-y-1 text-gray-600 text-sm font-light">
          <div className="flex justify-between px-2 py-1">
            <span>Item Total:</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between px-2 py-1">
            <span>Delivery Fee 🏍️</span>
            <span>₹{84}</span>
          </div>

          <div className="border-t border-gray-300 my-1"></div>

          <div className="flex justify-between px-2 py-1">
            <span>Platform Fee</span>
            <span>₹{6}</span>
          </div>

          <div className="flex justify-between px-2 py-1">
            <span>GST & Restaurant Charges</span>
            <span>₹{34}</span>
          </div>

          <div className="border-t border-gray-400 mt-2"></div>

          <div className="flex justify-between px-2 py-2  my-3 font-bold text-black text-base">
            <span>TO PAY</span>
            <span>₹{totalAmount + 84 + 34 + 6}</span>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-red-200 p-6 rounded-lg shadow-lg w-[400px] border-2 border-red-400">
            {" "}
            <h3 className="text-lg font-bold text-center">
              Hurray 😋,Your Order has been Placed 🥗Bon Appetite🍛
            </h3>
            <p className="text-center mt-2 italic">
              Thank You for Ordering with us
            </p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaceOrder;
