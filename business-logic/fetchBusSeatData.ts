import { getBusSeatData } from "@/data-access/getBusSeatData";
import { BusSeatData } from "@/app/api/travelData/busSeatData/busSeatData";

export function fetchBusSeatData(id: number): Promise<BusSeatData | null> {
  return getBusSeatData()
    .then((busSeatData) => {
      const matchingTravel = busSeatData[id];

      if (matchingTravel) {
        return matchingTravel;
      } else {
        return null;
      }
    })
    .catch(() => {
      return null;
    });
}
