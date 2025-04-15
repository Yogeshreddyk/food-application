import { CardComponent, withPromotedCard } from "./CardComponent";
import { useEffect, useState } from "react";
import { Shimmer } from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../Utils/useOnlineStatus";

export const Body = () => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const PromotedCard = withPromotedCard(CardComponent);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.907852&lng=77.4763541&collection=83639&tags=layout_CCS_Biryani&sortBy=&filters=&type=rcv2&offset=0&page_type=null"
    );
    const dataJson = await data.json();

    const slicedArray = dataJson?.data?.cards.slice(3);

    setData(slicedArray);
    setFilterData(slicedArray);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = () => {
    const filteredData = data?.filter(
      (item) => item?.card?.card?.info?.avgRating >= 4
    );

    setFilterData(filteredData);
  };

  const handleChange = (e) => {
    setSearchText(e.target?.value);
  };
  const handleSearch = () => {
    const dataRes = data?.filter((item) => {
      return item?.card?.card?.info?.name
        ?.toLowerCase()
        .includes(searchText.toLowerCase());
    });

    setFilterData(dataRes);
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) return <p>OOps , Looks like you are offline</p>;

  return (
    <div className="min-h-screen flex flex-col">
      {data?.length === 0 ? (
        <Shimmer  className="flex-grow"/>
      ) : (
        <>
          <div className="filter flex">
            <div className="search m-4 p-4">
              <input
                type="text"
                className="border border-solid border-black rounded-sm"
                value={searchText}
                onChange={(e) => handleChange(e)}
              ></input>
              <button
                className="px-3 py-0.5 bg-green-100 m-3 h-45 w-100 border border-solid border-green-500 rounded-md"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
            <div className="flex items-center">
              <button
                className="px-3 py-0.5  bg-gray-100  h-45 w-100 border border-soli  border-gray-600 rounded-md"
                onClick={handleClick}
              >
                Top Rated Restraurants
              </button>
            </div>
          </div>
          <div className="p-1 flex flex-wrap  gap-4 pb-20">
            {filterData?.map((item) => (
              <>
                <Link
                  to={"/restraurantDetails/" + item?.card?.card?.info?.id}
                  key={item?.card?.card?.info?.id}
                >
                  {item?.card?.card?.info?.promoted ? (
                    <PromotedCard
                      resData={item}
                      key={item?.card?.card?.info?.id}
                    />
                  ) : (
                    <CardComponent
                      key={item?.card?.card?.info?.id}
                      resData={item}
                    />
                  )}
                </Link>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
