import React, { FormEvent } from "react";
import SearchSection from "./SearchSection";

export default function SearchResultPage() {
  const searchQuery = "가나다";
  const events = [
    { title: "행사명" },
    { title: "행사명" },
    { title: "행사명" },
    { title: "행사명" },
  ];
  const booths = [
    { title: "부스명" },
    { title: "부스명" },
    { title: "부스명" },
    { title: "부스명" },
  ];
  const hashtags = [
    { title: "부스명" },
    { title: "부스명" },
    { title: "부스명" },
    { title: "부스명" },
  ];

  const handleSearchSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("검색어 입력 완료");
  };

  return (
    <div className="p-4 border-b-2 border-r-2 shadow-md m-10">
      <form className="mb-4 mx-44" onSubmit={handleSearchSubmit}>
        <div className="flex">
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            className="flex-grow p-2 border border-gray-300 rounded-l"
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-r"
          >
            검색
          </button>
        </div>
      </form>
      <header className="mb-4 text-center">
        <h1 className="text-xl font-bold">
          "{searchQuery}"에 대한 검색 결과입니다.
        </h1>
      </header>

      <div className="flex flex-col items-center gap-8 w-full">
        <SearchSection title="행사" items={events} buttonText="행사 더보기" />
        <SearchSection title="부스" items={booths} buttonText="부스 더보기" />
        <SearchSection
          title="#검색된_해시태그"
          items={hashtags}
          buttonText="부스 더보기"
        />
      </div>
    </div>
  );
}
