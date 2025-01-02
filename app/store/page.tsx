"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FaSquareParking,
  FaCar,
  FaAngleDown,
  FaHotel,
  FaCity,
} from "react-icons/fa6";

const locationNameMapping: { [key: string]: string } = {
  서울: "seoul",
  경기: "gyeonggi",
  부산: "busan",
  대구: "daegu",
  인천: "incheon",
  광주: "gwangju",
  대전: "daejeon",
  울산: "ulsan",
  강원: "gangwon",
  충북: "chungbuk",
  충남: "chungnam",
  전북: "jeolbuk",
  전남: "jeolnam",
  경북: "gyeongbuk",
  경남: "gyeongnam",
  제주: "jeju",
  세종: "sejong",
};

interface Store {
  name: string;
  address: string;
}

export default function StorePage() {
  const [storeList, setStoreList] = useState<Store[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("서울");
  const [storeCount, setStoreCount] = useState<number>(0);
  const [expandedStores, setExpandedStores] = useState<number[]>([]); // 확장된 매장 ID 상태

  const fetchData = async (location: string) => {
    try {
      const locationCode = locationNameMapping[location];
      const response = await fetch(
        `https://websseu.github.io/pythonStarbucks2/location/${locationCode}/${locationCode}_2024-12-06.json`
      );
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setStoreList(data.item || []);
      setStoreCount(data.count || 0);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  useEffect(() => {
    fetchData(selectedLocation); // 선택된 지역의 데이터 호출
  }, [selectedLocation]);

  const toggleStoreExpansion = (index: number) => {
    // 확장된 매장 ID 상태를 토글
    setExpandedStores((prevExpanded) =>
      prevExpanded.includes(index)
        ? prevExpanded.filter((id) => id !== index)
        : [...prevExpanded, index]
    );
  };

  return (
    <section id="storePage">
      <h1 className="store__icon">
        <span className="inline-block relative">
          <Image
            src={"/starbucks.png"}
            alt="starbucks"
            width={60}
            height={60}
            className="rounded-[14px] border border-[#f0f0f0]"
          />
        </span>
      </h1>

      <div className="store__local">
        <ul>
          {Object.keys(locationNameMapping).map((location) => (
            <li
              key={location}
              className={`cursor-pointer ${
                selectedLocation === location
                  ? "border-blue-500 bg-blue-100"
                  : ""
              }`}
              onClick={() => setSelectedLocation(location)}
            >
              {location}
            </li>
          ))}
        </ul>
      </div>

      <div className="store__lists">
        <div className="store__info">
          <h2>
            {selectedLocation} 스타벅스 ({storeCount})
          </h2>
          <div>
            <div className="flex items-center text-xs gap-1 text-zinc-600">
              <div className="flex items-center gap-1">
                <span className="border p-1 inline-block rounded-sm hover:bg-green-50 ">
                  <FaSquareParking />
                </span>
                <span className="text-xs text-gray-500">주차가능</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="noParking border p-1 inline-block rounded-sm hover:bg-green-50 ">
                  <FaSquareParking />
                </span>
                <span className="text-xs text-gray-500">주차불가능</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="border p-1 inline-block rounded-sm hover:bg-green-50 ">
                  <FaCar />
                </span>
                <span className="text-xs text-gray-500">DT</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="border p-1 inline-block rounded-sm hover:bg-green-50 ">
                  <FaCity />
                </span>
                <span className="text-xs text-gray-500">건물 1층</span>
              </div>
            </div>
          </div>
        </div>
        <ul>
          {storeList.map((store, index) => (
            <li key={index} className="store__list">
              <div className="block w-full py-3">
                <span className="number">{index + 1}</span>.
                <span className="name">{store.name}</span>
                <span className="address">{store.address}</span>
              </div>
              <div className="absolute right-0 flex gap-1">
                <span className="border p-1 inline-block rounded-sm hover:bg-green-50">
                  <FaCar title="드라이브 스루" />
                </span>

                <span className="border p-1 inline-block rounded-sm hover:bg-green-50">
                  <FaSquareParking title="주차가능" />
                </span>

                <span
                  className="border p-1 inline-block rounded-sm hover:bg-green-50 cursor-pointer"
                  onClick={() => toggleStoreExpansion(index)} // 아이콘 클릭 시 상태 변경
                >
                  <FaAngleDown />
                </span>
              </div>
              {/* 조건부 렌더링으로 추가 정보 표시 */}
              {expandedStores.includes(index) && (
                <div className="store__details flex gap-2 ml-14 pb-2">
                  <img
                    src="https://image.istarbucks.co.kr//upload/store/2017/08/[3483]_20170818074753_u95cx.jpg"
                    alt="istarbucks"
                    width={100}
                    className="rounded-md"
                  />
                  <img
                    src="https://image.istarbucks.co.kr//upload/store/2017/08/[3483]_20170818074802_wak6c.jpg"
                    alt="istarbucks"
                    width={100}
                    className="rounded-md"
                  />
                  <img
                    src="https://image.istarbucks.co.kr//upload/store/2017/08/[3483]_20170818074809_kodrz.jpg"
                    alt="istarbucks"
                    width={100}
                    className="rounded-md"
                  />
                  <img
                    src="https://image.istarbucks.co.kr//upload/store/2017/08/[3483]_20170818074816_17jhq.jpg"
                    alt="istarbucks"
                    width={100}
                    className="rounded-md"
                  />
                  <img
                    src="https://image.istarbucks.co.kr//upload/store/2017/08/[3483]_20170818074824_00mvg.jpg"
                    alt="istarbucks"
                    width={100}
                    className="rounded-md"
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
