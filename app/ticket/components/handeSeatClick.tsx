"use client";
import { toast } from "react-toastify";
import { Button } from "@mui/material";

const handleSeatClick = (
  row: number,
  col: number,
  busLayout: (string | null)[][],
  userGender: string,
  selectedSeats: string[],
  setSelectedSeats: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const seat = `${row}${col}`;

  if (
    (busLayout[row][col] === "male" || busLayout[row][col] === "female") &&
    !selectedSeats.includes(seat)
  ) {
    return;
  }
  if (
    busLayout[row][0] === "male" &&
    seat.charAt(1) === "1" &&
    userGender === "female"
  ) {
    toast.warn("Karşı cinsin yanına oturulamaz");
    return;
  }
  if (
    busLayout[row][0] === "female" &&
    seat.charAt(1) === "1" &&
    userGender === "male"
  ) {
    toast.warn("Karşı cinsin yanına oturulamaz");
    return;
  }

  if (
    busLayout[row][1] === "male" &&
    seat.charAt(1) === "0" &&
    userGender === "female"
  ) {
    toast.warn("Karşı cinsin yanına oturulamaz");
    return;
  }
  if (
    busLayout[row][1] === "female" &&
    seat.charAt(1) === "0" &&
    userGender === "male"
  ) {
    toast.warn("Karşı cinsin yanına oturulamaz");
    return;
  }

  if (
    busLayout[row][2] === "male" &&
    seat.charAt(1) === "3" &&
    userGender === "female"
  ) {
    toast.warn("Karşı cinsin yanına oturulamaz");
    return;
  }
  if (
    busLayout[row][2] === "female" &&
    seat.charAt(1) === "3" &&
    userGender === "male"
  ) {
    toast.warn("Karşı cinsin yanına oturulamaz");
    return;
  }

  if (
    busLayout[row][3] === "male" &&
    seat.charAt(1) === "2" &&
    userGender === "female"
  ) {
    toast.warn("Karşı cinsin yanına oturulamaz");
    return;
  }
  if (
    busLayout[row][3] === "female" &&
    seat.charAt(1) === "2" &&
    userGender === "male"
  ) {
    toast.warn("Karşı cinsin yanına oturulamaz");
    return;
  }

  if (selectedSeats.length >= 5 && !selectedSeats.includes(seat)) {
    toast.error("En fazla 5 koltuk seçilebilir.");
    return;
  }

  if (selectedSeats.includes(seat)) {
    setSelectedSeats(selectedSeats.filter((s) => s !== seat));
  } else {
    setSelectedSeats([...selectedSeats, seat]);
  }
  console.clear();
};

export default handleSeatClick;
