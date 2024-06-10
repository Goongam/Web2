import "../../../../index.css"; // 사용자 정의 CSS 파일 포함
import { useGetLocation } from "../../../../Hooks/Event/useGetLocation";
import LocationStateInfo from "./LocationStateInfo";

interface Props {
  eventId: string;
  selectedSeatIds: number[];
  selectedSeatNumbers: string[];
  setSelectedSeatIds: (ids: number[] | ((prev: number[]) => number[])) => void;
  setSelectedSeatNumbers: (
    numbers: string[] | ((prev: string[]) => string[])
  ) => void;
}

export default function RegistLocationPage({
  eventId,
  setSelectedSeatIds,
  setSelectedSeatNumbers,
  selectedSeatIds,
  selectedSeatNumbers,
}: Props) {
  const { isLoading, isError, data } = useGetLocation(eventId);
  const maxSelectableSeats = 3;

  if (isLoading) {
    return <div>로딩중입니다...</div>;
  }

  if (isError) {
    return <div>오류가 발생했습니다.</div>;
  }

  const getColorClass = (status: "EMPTY" | "WAITING" | "COMPLETE") => {
    switch (status) {
      case "EMPTY":
        return "bg-yellow-400";
      case "WAITING":
        return "bg-red-400";
      case "COMPLETE":
        return "bg-gray-400";
      default:
        return "";
    }
  };

  const handleSeatClick = (seatId: number, seatNumber: string, row: string) => {
    const uniqueSeatNumber = `${row}-${seatNumber}`;

    setSelectedSeatIds((prevSelectedSeatIds: number[]) => {
      if (prevSelectedSeatIds.includes(seatId)) {
        return prevSelectedSeatIds.filter((id) => id !== seatId);
      } else if (prevSelectedSeatIds.length < maxSelectableSeats) {
        return [...prevSelectedSeatIds, seatId];
      } else {
        alert(`You can select up to ${maxSelectableSeats} seats.`);
        return prevSelectedSeatIds;
      }
    });

    setSelectedSeatNumbers((prevSelectedSeatNumbers: string[]) => {
      if (prevSelectedSeatNumbers.includes(uniqueSeatNumber)) {
        return prevSelectedSeatNumbers.filter(
          (number) => number !== uniqueSeatNumber
        );
      } else if (prevSelectedSeatNumbers.length < maxSelectableSeats) {
        return [...prevSelectedSeatNumbers, uniqueSeatNumber];
      } else {
        return prevSelectedSeatNumbers;
      }
    });
  };

  const renderSeats = () => {
    if (!data) return null;
    const seatRows = [];
    const layoutType = data.layoutType;

    for (const row in data.areas) {
      const seatElements = data.areas[row].map((area) => {
        const seatNumber =
          layoutType === "ALPHABET" ? `${row}${area.number}` : area.number;

        return (
          <div
            key={area.id}
            className={`w-16 h-16 ${getColorClass(
              area.status
            )} m-1 flex items-center justify-center text-center text-sm font-mono ${
              selectedSeatIds.includes(area.id)
                ? "border-4 border-blue-500"
                : ""
            } ${area.status !== "COMPLETE" ? "cursor-pointer" : ""}`}
            onClick={() =>
              area.status !== "COMPLETE" &&
              handleSeatClick(area.id, seatNumber, row)
            }
          >
            {seatNumber}
          </div>
        );
      });
      seatRows.push(
        <div key={row} className="flex justify-start mb-2 font-bold">
          {seatElements}
        </div>
      );
    }
    return seatRows;
  };

  return data ? (
    <>
      <div className="flex w-full gap-4 h-full">
        <div className="w-1/2 py-5 flex flex-col h-[600px] items-center bg-blue-100 rounded-lg ">
          <div className="text-3xl h-1/3 font-bold">행사장 구조도</div>
          <img
            src={data.layoutImageUrls[0]}
            alt="Event Venue"
            className="w-2/3 h-auto rounded mt-3"
          />
        </div>
        <div className="w-1/2 flex flex-col items-center pt-5 bg-blue-100 rounded-lg h-[600px] overflow-x-scroll overflow-y-scroll scrollbar-custom">
          <div className="text-3xl font-bold">부스 신청 현황</div>
          <div className="w-full flex flex-col items-start pl-5 pt-3">
            {renderSeats()}
          </div>
        </div>
      </div>
      <div className="flex pr-1 mt-4 w-full justify-end">
        <LocationStateInfo color="yellow-400" state={"비어있음"} />
        <LocationStateInfo color="red-400" state={"예약됨"} />
        <LocationStateInfo color="gray-400" state={"승인됨"} />
      </div>
    </>
  ) : (
    <>잘못된 접근입니다.</>
  );
}
