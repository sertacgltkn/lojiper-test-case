import axios from "axios";
import { BusSeatData } from "@/app/api/travelData/busSeatData/busSeatData";

export function getBusSeatData(): Promise<BusSeatData[]> {
  return axios
    .get("/api/travelData/busSeatData/")
    .then((response) => {
      if (response.status === 200) {
        return response.data as BusSeatData[];
      } else {
        return [];
      }
    })
    .catch(() => {
      return [];
    });
}
