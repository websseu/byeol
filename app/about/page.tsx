"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  FaSquareParking,
  FaCar,
  FaFaceGrinStars,
  FaAngleDown,
  FaAngleUp,
  FaSquareWebAwesome,
} from "react-icons/fa6";
import Lightbox from "@/components/Lightbox";

interface StoreItem {
  id: string;
  name: string;
  address: string;
  parking: string[];
  images: string[];
}

export default function AboutPage() {
  const [stores, setStores] = useState<StoreItem[]>([]);
  const [isImageVisible, setIsImageVisible] = useState<boolean[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  useEffect(() => {
    fetch(
      "https://websseu.github.io/pythonStarbucks2/location/incheon/incheon_total.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setStores(data.item);
        setIsImageVisible(new Array(data.item.length).fill(false));
      })

      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const toggleImageVisibility = (index: number) => {
    setIsImageVisible((prev) =>
      prev.map((visible, idx) => (idx === index ? !visible : visible))
    );
  };

  const openModal = (images: string[], index: number) => {
    setCurrentImages(images);
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    setCurrentImages([]);
  };

  // 필터링된 데이터
  const filteredStores = stores.filter((store) => {
    // 선택된 필터가 없으면 모든 매장 표시
    if (selectedFilter.length === 0) return true;

    const conditions = [];

    if (selectedFilter.includes("DT점")) {
      conditions.push(store.parking[0] === "DT점");
    }

    if (selectedFilter.includes("주차 가능")) {
      conditions.push(store.parking[1] === "주차가능");
    }

    if (selectedFilter.includes("주차 무료")) {
      conditions.push(store.parking[3] === "무료");
    }

    // 모든 선택된 필터 조건을 충족하는지 확인
    return conditions.length > 0
      ? conditions.every((condition) => condition)
      : true;
  });

  const toggleFilter = (filter: string) => {
    setSelectedFilter(
      (prev) =>
        prev.includes(filter)
          ? prev.filter((f) => f !== filter) // 이미 있으면 제거
          : [...prev, filter] // 없으면 추가
    );
  };

  return (
    <>
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

        <div className="store__lists">
          <div className="store__info">
            <h2>
              스타벅스 <span>({filteredStores.length})</span>
            </h2>

            {/* 필터 버튼 */}
            <div className="flex items-center gap-1 text-xs text-zinc-600">
              <button
                className={`flex items-center gap-1 rounded-sm p-1 px-2 ${
                  selectedFilter.includes("DT점")
                    ? "bg-[#35a659] text-white"
                    : ""
                }`}
                onClick={() => toggleFilter("DT점")}
              >
                <FaCar />
                DT점
              </button>
              <button
                className={`flex items-center gap-1 rounded-sm p-1 px-2 ${
                  selectedFilter.includes("주차 가능")
                    ? "bg-[#35a659] text-white"
                    : ""
                }`}
                onClick={() => toggleFilter("주차 가능")}
              >
                <FaSquareParking />
                주차 가능
              </button>
              <button
                className={`flex items-center gap-1 rounded-sm p-1 px-2 ${
                  selectedFilter.includes("주차 무료")
                    ? "bg-[#35a659] text-white"
                    : ""
                }`}
                onClick={() => toggleFilter("주차 무료")}
              >
                <FaFaceGrinStars />
                주차 무료
              </button>
              <button
                className={`flex items-center gap-1 p-1 rounded-sm ${
                  selectedFilter.length === 0 ? "bg-[#35a659] text-white" : ""
                }`}
                onClick={() => setSelectedFilter([])} // 필터 전체 해제
              >
                <FaSquareWebAwesome />
                모든 매장
              </button>
            </div>
          </div>
        </div>

        <ul>
          {filteredStores.map((store, index) => (
            <li
              key={store.id}
              className="border-b border-dashed hover:bg-[#e0eeea]"
            >
              <div className="store__list justify-between items-center">
                <div className="py-3">
                  <span className="number">{index + 1}</span>.
                  <span className="name">{store.name}</span>.
                  <span className="address pr-2">{store.address}</span>
                  {isImageVisible[index] && (
                    <span className="text-xs text-zinc-600 bg-yellow-200 p-1">
                      <span className="pl-1">{store.parking[0]}</span>
                      <span className="pl-1">{store.parking[1]}</span>
                      <span className="pl-1">{store.parking[2]}</span>
                      <span className="pl-1">{store.parking[3]}</span>
                      <span className="pl-1">{store.parking[4]}</span>
                    </span>
                  )}
                </div>
                <div className="py-3 flex gap-1">
                  <span
                    className="border p-1 inline-block rounded-sm hover:bg-green-50 cursor-pointer"
                    onClick={() => toggleImageVisibility(index)}
                  >
                    {isImageVisible[index] ? <FaAngleUp /> : <FaAngleDown />}
                  </span>
                </div>
              </div>

              {isImageVisible[index] && ( // 이미지가 보이도록 설정된 경우 렌더링
                <div className="store__details flex gap-2 ml-14 pb-4">
                  {store.images.map((image, idx) => (
                    <div
                      key={idx}
                      onClick={() => openModal(store.images, idx)}
                      style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                      className="w-24 h-24 rounded-md border cursor-pointer"
                    />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Lightbox 컴포넌트 */}
      {selectedImageIndex !== null && (
        <Lightbox
          images={currentImages}
          initialIndex={selectedImageIndex}
          onClose={closeModal}
        />
      )}
    </>
  );
}
