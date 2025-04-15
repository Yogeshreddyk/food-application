import { useEffect, useState } from "react";
import { MENU } from "./constants";

export const useRestaurantMenu = (resId) => {
  const [menuData, setMenuData] = useState(null);

  const fetchData = async () => {
    const data = await fetch(MENU + resId + "&catalog_qa=undefined&query=Biryani");
    const json = await data?.json();
    setMenuData(json?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return menuData;
};
