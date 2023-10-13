import { TravelData } from "@/app/Interfaces/uiRelatedTypes";
import { UserSearchQuery } from "@/app/Context/mainProvider";
import { getTravelData } from "@/data-access/getTravel";

export function fetchTravelData(
  userSearchQuery: UserSearchQuery
): Promise<TravelData | null> {
  return getTravelData()
    .then((allTravelData) => {
      const matchingTravel = allTravelData.find((travel: TravelData) => {
        return (
          travel.departCity === userSearchQuery.departCity &&
          travel.arrivalCity === userSearchQuery.arrivalCity &&
          travel.date === userSearchQuery.inputDate
        );
      });

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
