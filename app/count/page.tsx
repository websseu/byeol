"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Data {
  날짜: string;
  전체: number;
  [region: string]: number | string;
}

export default function CountPage() {
  const [dataList, setDataList] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 시작 날짜 (11월 11일)
  const START_DATE = new Date("2024-11-11");

  useEffect(() => {
    async function fetchData() {
      try {
        const today = new Date();
        const dates: string[] = [];

        // 11월 11일부터 현재 날짜까지의 날짜 배열 생성
        for (
          let date = new Date(today);
          date >= START_DATE;
          date.setDate(date.getDate() - 1)
        ) {
          dates.push(date.toISOString().split("T")[0]); // "YYYY-MM-DD" 포맷
        }

        // 각 날짜 데이터를 비동기로 가져오기
        const fetchedData: Data[] = await Promise.all(
          dates.map(async (date) => {
            const url = `https://websseu.github.io/pythonStarbucks2/location/count/starbucks-count_${date}.json`;
            const response = await fetch(url);

            if (!response.ok) {
              console.warn(`Data not found for ${date}`); // 데이터가 없는 경우 경고 출력
              return null;
            }

            const jsonData: Data = await response.json();
            return jsonData;
          })
        ).then(
          (results) =>
            results.filter((result): result is Data => result !== null) // 유효한 데이터만 필터링
        );

        setDataList(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("데이터를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p className="byeol__loading">로딩 중...</p>;
  }

  if (error) {
    return <p className="byeol__error">{error}</p>;
  }

  if (dataList.length === 0) {
    return <p className="byeol__loading">데이터가 없습니다.</p>;
  }

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

      <div className="count__list">
        <table className="count__table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>전체</th>
              <th>서울</th>
              <th>경기</th>
              <th>광주</th>
              <th>대구</th>
              <th>대전</th>
              <th>부산</th>
              <th>울산</th>
              <th>인천</th>
              <th>강원</th>
              <th>경남</th>
              <th>경북</th>
              <th>전남</th>
              <th>전북</th>
              <th>충남</th>
              <th>충북</th>
              <th>제주</th>
              <th>세종</th>
            </tr>
          </thead>
          <tbody>
            {/* 역순으로 데이터 표시 */}
            {dataList.reverse().map((data) => (
              <tr key={data["날짜"]}>
                <td>{data["날짜"]}</td>
                <td>{data["전체"]}</td>
                <td>{data["서울"] || 0}</td>
                <td>{data["경기"] || 0}</td>
                <td>{data["광주"] || 0}</td>
                <td>{data["대구"] || 0}</td>
                <td>{data["대전"] || 0}</td>
                <td>{data["부산"] || 0}</td>
                <td>{data["울산"] || 0}</td>
                <td>{data["인천"] || 0}</td>
                <td>{data["강원"] || 0}</td>
                <td>{data["경남"] || 0}</td>
                <td>{data["경북"] || 0}</td>
                <td>{data["전남"] || 0}</td>
                <td>{data["전북"] || 0}</td>
                <td>{data["충남"] || 0}</td>
                <td>{data["충북"] || 0}</td>
                <td>{data["제주"] || 0}</td>
                <td>{data["세종"] || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
