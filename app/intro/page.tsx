import Image from "next/image";
import React from "react";

export default function IntroPage() {
  return (
    <section id="CountPage">
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
      <div className="card__title">
        <span>#6 새로운 경험을 선사하는 스타벅스</span>
        <span>#5 가을의 정취를 품은 스타벅스</span>
        <span>#8 중국의 고풍스러은 스타벅스</span>
        <span>#8 일본의 고풍스러은 스타벅스</span>
        <span>#4 놀라움이 있는 스타벅스</span>
        <span>#3 예술과 함계하는 스타벅스</span>
        <span>#2 바다가 보이는 스타벅스</span>
        <span>#1 벚꼿이 보이는 스타벅스</span>
      </div>
      <div className="card__inner">
        <div>
          <h2>더춘천의암호R점</h2>
          <Image
            src={"/starbucks/starbucks100.jpg"}
            alt="starbucks"
            width={800}
            height={500}
          />
        </div>
        <div>
          <h2>제주금악DT점</h2>
          <Image
            src={"/starbucks/starbucks101.jpg"}
            alt="starbucks"
            width={800}
            height={500}
          />
        </div>
        <div>
          <h2>화성보통저수지점</h2>
          <Image
            src={"/starbucks/starbucks102.jpg"}
            alt="starbucks"
            width={800}
            height={500}
          />
        </div>
        <div>
          <h2>물왕호수점</h2>
          <Image
            src={"/starbucks/starbucks103.jpg"}
            alt="starbucks"
            width={800}
            height={500}
          />
        </div>
        <div>
          <h2>제주한담해변DT점</h2>
          <Image
            src={"/starbucks/starbucks104@2x.jpg"}
            alt="starbucks"
            width={800}
            height={500}
          />
        </div>
        <div>
          <h2>용인에버랜드점</h2>
          <Image
            src={"/starbucks/starbucks105@2x.jpg"}
            alt="starbucks"
            width={800}
            height={500}
          />
        </div>
      </div>
    </section>
  );
}
