import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import coffeeShops from "../../data.json";
import coffeeIcon from "../../asset/coffee_icon.svg";
import drinksIcon from "../../asset/drinks_icon.svg";
import foodIcon from "../../asset/food_icon.svg";
import addIcon from "../../asset/add_icon.svg";
import leftIcon from "../../asset/left_arrow.svg";
import ApiService from "../../apiService";

const CoffeeShop = () => {
  const [activeTab, setActiveTab] = useState("coffee");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [coffeeDetails, setCoffeeDetails] = useState([]);
  const [drinksDetails, setDrinksDetails] = useState([]);
  const [foodDetails, setFoodDetails] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.get(`/${id}`);
        setData(response.data);
        setCoffeeDetails([]);
        setFoodDetails([]);
        setDrinksDetails([]);
        response.data.products.forEach((element) => {
          if (element.category === "Coffee") {
            setCoffeeDetails((prevState) => {
              return [...prevState, element];
            });
          }
          if (element.category === "Food") {
            setFoodDetails((prevState) => {
              return [...prevState, element];
            });
          }
          if (element.category === "Drinks") {
            setDrinksDetails((prevState) => {
              return [...prevState, element];
            });
          }
        });
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="h-full w-full">
      <div
        className="absolute top-4 left-4 bg-white p-2 rounded-[7px]"
        onClick={handleBackClick}
      >
        <img src={leftIcon} width="12px"></img>
      </div>
      <div className="h-[350px] w-full z-0 overflow-hidden">
        <img src={data.images ? data.images[0] : ""}></img>
      </div>
      <div className="h-fit absolute top-[300px] left-0 w-full bg-white z-10 rounded-t-[40px] px-6 py-5">
        <div className="px-4">
          <div className="text-[16px] w-full py-2 font-bold text-left text-[#003B40]">
            {data.name}
          </div>
          <div className="text-[14px] p-1 w-full font-semibold text-left text-[#B7C1C2]">
            {data.rating} ratings
          </div>
          <div className="text-[14px] w-full font-semibold text-left text-[#003B40]">
            {data.rating} miles
          </div>
        </div>
        <div className="py-6 px-4 flex justify-between items-center">
          <div
            className={`w-[100px] h-[100px] flex flex-col items-center justify-center rounded-[27px] transition-all duration-300 ${
              activeTab === "coffee" ? "bg-[#EDF0EF]" : ""
            }`}
            onClick={() => handleClick("coffee")}
          >
            <img src={coffeeIcon} alt="Coffee Icon" width="25px" />
            <p
              className={`transition-all duration-300 ${
                activeTab === "coffee"
                  ? "text-[#003B40] font-semibold text-lg"
                  : ""
              }`}
            >
              Coffee
            </p>
          </div>
          <div
            className={`w-[100px] h-[100px] flex flex-col items-center justify-center rounded-[27px] transition-all duration-300 ${
              activeTab === "drinks" ? "bg-[#EDF0EF]" : ""
            }`}
            onClick={() => handleClick("drinks")}
          >
            <img src={drinksIcon} alt="Drinks Icon" width="25px" />
            <p
              className={`transition-all duration-300 ${
                activeTab === "drinks"
                  ? "text-[#003B40] font-semibold text-lg"
                  : ""
              }`}
            >
              Drinks
            </p>
          </div>
          <div
            className={`w-[100px] h-[100px] flex flex-col items-center justify-center rounded-[27px] transition-all duration-300 ${
              activeTab === "food" ? "bg-[#EDF0EF]" : ""
            }`}
            onClick={() => handleClick("food")}
          >
            <img src={foodIcon} alt="Food Icon" width="25px" />
            <p
              className={`transition-all duration-300 ${
                activeTab === "food"
                  ? "text-[#003B40] font-semibold text-lg"
                  : ""
              }`}
            >
              Food
            </p>
          </div>
        </div>
        <div>
          {activeTab === "coffee" && coffeeDetails.map((each) => (
            <div className="w-full mb-4 relative flex items-center justify-between p-4 bg-[#EDF0EF] rounded-[20px]">
              <div className="h-[90px] w-[90px] bg-slate-500 rounded-[17px]"></div>
              <div className="text-[#003B40] w-2/3 text-left pl-6">
                <p className="text-base font-bold">{each.name}</p>
                <p className="text-xs font-normal">
                  A chocolate-flavored warm beverage that is a variant of a café
                  latte
                </p>
                <p className="text-sm font-semibold">{each.price}</p>
              </div>
              <div className="absolute -top-2 -right-2 w-[36px] h-[36px] bg-[#003B40] rounded-[50%] flex justify-center items-center border-4 border-white">
                <img src={addIcon} width="24px"></img>
              </div>
            </div>
          ))}
          {activeTab === "drinks" && drinksDetails.map((each) => (
            <div className="w-full mb-4 relative flex items-center justify-between p-4 bg-[#EDF0EF] rounded-[20px]">
              <div className="h-[90px] w-[90px] bg-slate-500 rounded-[17px]"></div>
              <div className="text-[#003B40] w-2/3 text-left pl-6">
                <p className="text-base font-bold">{each.name}</p>
                <p className="text-xs font-normal">
                  A chocolate-flavored warm beverage that is a variant of a café
                  latte
                </p>
                <p className="text-sm font-semibold">{each.price}</p>
              </div>
              <div className="absolute -top-2 -right-2 w-[36px] h-[36px] bg-[#003B40] rounded-[50%] flex justify-center items-center border-4 border-white">
                <img src={addIcon} width="24px"></img>
              </div>
            </div>
          ))}
          {activeTab === "food" && foodDetails.map((each) => (
            <div className="w-full mb-4 relative flex items-center justify-between p-4 bg-[#EDF0EF] rounded-[20px]">
              <div className="h-[90px] w-[90px] bg-slate-500 rounded-[17px]"></div>
              <div className="text-[#003B40] w-2/3 text-left pl-6">
                <p className="text-base font-bold">{each.name}</p>
                <p className="text-xs font-normal">
                  A chocolate-flavored warm beverage that is a variant of a café
                  latte
                </p>
                <p className="text-sm font-semibold">{each.price}</p>
              </div>
              <div className="absolute -top-2 -right-2 w-[36px] h-[36px] bg-[#003B40] rounded-[50%] flex justify-center items-center border-4 border-white">
                <img src={addIcon} width="24px"></img>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoffeeShop;
