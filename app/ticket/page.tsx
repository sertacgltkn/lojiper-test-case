"use client";
import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Grid, Typography, Button, Stack, Box } from "@mui/material";
import { Icon } from '@iconify/react';
import routeIcon from '@iconify/icons-fa-solid/route';
import pricetagsIcon from '@iconify/icons-ion/pricetags';
import personFill from '@iconify/icons-bi/person-fill';
import turkishLira from '@iconify/icons-fa/turkish-lira';
import { BusSeatData } from "../api/travelData/busSeatData/busSeatData";
import { fetchBusSeatData } from "@/business-logic/fetchBusSeatData";
import "./ticketStyle.css";
import Loading from "../components/Loading";
import { fetchTravelData } from "@/business-logic/fetchTravelData";
import { MainContext } from "../Context/mainProvider";
import handleSeatClick from "./components/handeSeatClick";
import "../styles/Home.css";
import Header from "../components/Header";
import Link from "next/link";
import busImage from "../assets/busImage.jpeg";
import Image from 'next/image';
import Footer from "../components/Footer";

const SeatSelectionPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const departCity = searchParams.get("depart");
  const arrivalCity = searchParams.get("arrival");
  const { userGender, isLogin, userName } = useContext(MainContext); // Kullanıcı bilgilerini çekin
  const { userSearchQuery, setTotalPrice } = useContext(MainContext);
  const [searchResults, setSearchResults] = useState<TravelData | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [newSeatData, setNewSeatData] = useState<BusSeatData | undefined>(
    undefined
  );
  const [error, setError] = useState("");



  useEffect(() => {
    setSelectedSeats([]);
    fetchBusSeatData(Number(id))
      .then((results) => {
        setNewSeatData(results || undefined);
      })
      .catch((error) => {
        setError("Bir Hata oluştu, lütfen tekrar deneyiniz");
      });
  }, [id]);

  useEffect(() => {
    fetchTravelData(userSearchQuery)
      .then((results) => {
        setSearchResults(results || null);
      })
      .catch((error) => {
        setError("Bir Hata oluştu, lütfen tekrar deneyiniz");
      });
  }, []);

  if (!newSeatData) {
    return (
      <div className="main">
        <Loading />
      </div>
    );
  }

  const seatData = newSeatData;
  const numRows = 6;
  const numCols = 4;
  const busLayout: (string | null)[][] = Array.from({ length: numRows }, () =>
    Array(numCols).fill(null)
  );
  seatData.forEach(
    (seat: {
      row: number;
      col: number;
      isOccupied: boolean;
      passengerGender: string;
    }) => {
      const { row, col, isOccupied, passengerGender } = seat;
      if (row >= 0 && row < numRows && col >= 0 && col < numCols) {
        busLayout[row][col] = isOccupied ? passengerGender : null;
      }
    }
  );

  const handleSeatClickWrapper = (row: number, col: number) => {
    handleSeatClick(
      row,
      col,
      busLayout,
      userGender,
      selectedSeats,
      setSelectedSeats
    );
  };

  const calculateTotalPrice = () => {
    const basePrice = searchResults?.price;
    return basePrice ? basePrice * selectedSeats.length : null;
  };

  return (
    <>
      <div className="main">
        <div className="seat-selection-page">
          <Header />
          <Stack spacing={5} alignItems="center" padding={1}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Box component={Icon} icon={routeIcon} sx={{ color: 'primary.main', width: 30, height: 30, marginRight: '10px' }} />
              <Typography variant="h4" style={{ color: "#3498db" }}>
                {departCity} - {arrivalCity} Seferi
              </Typography>
            </div>
          </Stack>
          <Stack spacing={5} alignItems="center" padding={1}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Box component={Icon} icon={pricetagsIcon} sx={{ color: 'primary.main', width: 20, height: 20, marginRight: '10px' }} />
              <Typography variant="h5" style={{ color: "#3498db" }}>
                Sefer Detayları ve Fiyat
              </Typography>
            </div>
          </Stack>

          <Stack spacing={5} alignItems="center" padding={1}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Box component={Icon} icon={personFill} sx={{ color: 'primary.main', width: 20, height: 20, marginRight: '10px' }} />
              <Typography variant="body1" style={{ fontSize: "18px", color: "#3498db" }}>
                Merhaba {userName} {userGender === "male" ? <span>(E)</span> : <span>(K)</span>}
              </Typography>
            </div>
          </Stack>

          <ToastContainer />
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="bus-layout">

            {busLayout.map((row, rowIndex) => (
                <div key={rowIndex} className="bus-row">
                  {row.map((passenger, colIndex) => (
                      <div
                          key={colIndex}
                          className={`bus-seat ${
                              selectedSeats.includes(`${rowIndex}${colIndex}`)
                                  ? "selected"
                                  : passenger === "male"
                                      ? "occupied-male"
                                      : passenger === "female"
                                          ? "occupied-female"
                                          : ""
                          } ${colIndex === 1 ? "gapBetween" : ""}`}
                          onClick={() => handleSeatClickWrapper(rowIndex, colIndex)}
                      >
                        {selectedSeats.includes(`${rowIndex}${colIndex}`)
                            ? "X"
                            : passenger
                                ? passenger === "male"
                                    ? "E"
                                    : "K"
                                : `${rowIndex * numCols + colIndex + 1}`}
                      </div>
                  ))}
                </div>
            ))}
          </div>
          <Stack spacing={5} alignItems="center" padding={1}>
            <div style={{ display: 'flex', alignItems: 'center'}}>
              <Box component={Icon} icon={turkishLira} sx={{ color: 'primary.main', width: 20, height: 20, marginRight: '10px' }} />
              <Typography variant="h5" style={{ color: "#3498db", padding: "10px", borderRadius: "10px" }}>
                Toplam Ücret: {calculateTotalPrice()} TL
              </Typography>
            </div>
          </Stack>

          {isLogin ? (
              <Button
                  variant="contained"
                  color="primary"
                  style={{
                    backgroundColor: "#3498db", 
                    color: "#fff", 
                    padding: "12px 24px", 
                    borderRadius: "6px", 
                    border: "none", 
                    cursor: "pointer", 
                    fontSize: "18px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    transition: "background-color 0.3s, transform 0.2s",
                  }}
              >
                <Link href="/payment" passHref>
                  Ödeme
                </Link>
              </Button>
          ) : (
            <>
              <p>Koltuk seçmek için lütfen giriş yapın</p>
              <Link href="/login" passHref>
                <Button variant="contained" color="primary">
                  Giriş Yap
                </Button>
              </Link>
            </>
          )}
          <ToastContainer />
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default SeatSelectionPage;