import React, { useEffect, useState } from "react";
import searchIcon from "../../asset/search_icon.svg";
import favouriteIcon from "../../asset/favourite_icon.svg";
import filterIcon from "../../asset/filter_icon.svg";
import { Link } from "react-router-dom";
import coffeeShop from "../../data.json";
import ApiService from "../../apiService";

const Home = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.get("/");
        setData(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-full p-5 mb-[100px]">
      <div className="flex w-full justify-end">
        <img
          className="w-10 h-10 rounded-[20px]"
          src="https://imgs.search.brave.com/hnEZAzPWEDsQ9IlUaDxGRiebKLjxmAQsBnXH2T-yhhk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDkz/NTExNjI3L3Bob3Rv/L2NvbmZpZGVudC1t/YW4tc2l0dGluZy1v/bi1hcm1jaGFpci1h/dC1ob21lLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz00dTdS/YzlheWpZRklyaFRG/TWM3YTZxSGxSYUZC/dlRwMmpCeUIzT1VE/V2xBPQ"
        ></img>
      </div>
      <div className="py-2 font-semibold text-[25px] text-[#003B40] text-left">
        Find a coffee shop anywhere
      </div>
      <div className="flex justify-between py-4">
        <div className="h-14 flex-1 mr-4 bg-[#EDF0EF] flex justify-start shadow-lg items-center rounded-[20px]">
          <img
            src={searchIcon}
            className="ml-4"
            width="25px"
            height="25px"
          ></img>
          <p className="text-[#A4ADAE] text-base font-semibold ml-3">Search</p>
        </div>
        <div className="h-14 w-14 rounded-[20px] flex justify-center items-center shadow-lg bg-[#003B40]">
          <img src={filterIcon} width="25px" height="25px"></img>
        </div>
      </div>
      <div className="py-2 font-semibold text-[20px] text-[#003B40] text-left">
        Featured coffee shops
      </div>
      <div className="flex flex-wrap justify-between">
        {data.map((each) => (
          <Link
            key={each.id}
            to={`/shop/${each._id}`}
            className="w-[45%] flex flex-col items-center relative py-3"
          >
            <img
              className="rounded-[20px] h-[160px] w-full"
              src={each.images[1]}
            ></img>
            <div className="text-[16px] w-full py-2 font-bold text-left text-[#003B40]">
              {each.name}
            </div>
            <div className="text-[14px] p-1 w-full font-semibold text-left text-[#B7C1C2]">
              {each.rating} ratings
            </div>
            <div className="text-[14px] w-full font-semibold text-left text-[#003B40]">
              {each.rating} miles
            </div>
            <div className="absolute -top-[10px] -right-[10px] h-9 w-9 rounded-[50%] bg-[#EDF0EF] flex justify-center items-center border-[4px] border-white">
              <img src={favouriteIcon} width="16px" height="16px"></img>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
