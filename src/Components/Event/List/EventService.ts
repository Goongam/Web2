// eventService.ts
import { EventResponse } from "./Interfaces";
import { getAccessToken } from "../../../Api/Util/token";

export const fetchEvents = async (
  sliceNumber: number,
  sortOrder: string,
  progress: string
): Promise<EventResponse> => {
  const token = getAccessToken();
  const response = await fetch(
    `http://52.79.91.214:8080/events?page=${sliceNumber}&sort=openDate%2C${
      sortOrder === "최신순" ? "DESC" : "ASC"
    }&progress=${progress}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
