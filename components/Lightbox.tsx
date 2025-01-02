"use client";

import React, { useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { IoCloseOutline } from "react-icons/io5";

interface LightboxProps {
  images: string[]; // 이미지 배열
  initialIndex: number; // 처음 표시할 이미지 인덱스
  onClose: () => void; // 모달 닫기 함수
}

export default function Lightbox({
  images,
  initialIndex,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      {/* 이전 이미지 버튼 */}
      <button
        type="button"
        className="absolute left-4 top-1/2 text-[50px] -translate-y-1/2 text-white"
        onClick={handlePrev}
      >
        <SlArrowLeft />
      </button>

      {/* 이미지 표시 */}
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="rounded-md max-w-[90vw] max-h-[90vh]"
      />

      {/* 다음 이미지 버튼 */}
      <button
        type="button"
        className="absolute right-4 top-1/2 text-[50px] -translate-y-1/2 text-white"
        onClick={handleNext}
      >
        <SlArrowRight />
      </button>

      {/* 닫기 버튼 */}
      <button
        className="absolute top-2 right-2 text-[50px] text-white"
        onClick={onClose}
      >
        <IoCloseOutline />
      </button>
    </div>
  );
}
