"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  Button,
  Paper,
  Card,
} from "@mui/material";
import Image from "next/image";
import ticket from "./ticket.png";
import Link from "next/link";
import { MainContext } from "../Context/mainProvider";
import { fetchTravelData } from "@/business-logic/fetchTravelData";
import { TravelData } from "../Interfaces/uiRelatedTypes";
import Header from "../components/Header";
import "../styles/Home.css";
import { fetchBusSeatData } from "@/business-logic/fetchBusSeatData";
import { BusSeatData } from "../api/travelData/busSeatData/busSeatData";
import Loading from "../components/Loading";
import { useRouter } from "next/navigation";
import { showToastFail } from "@/app/register/components/ShowToast";
import DirectionsIcon from "@mui/icons-material/Directions";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import AirlineSeatLegroomReducedIcon from "@mui/icons-material/AirlineSeatLegroomReduced";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Footer from "../components/Footer";

const SearchResultsPage = () => {
  const { isLogin, userName, userSearchQuery } = useContext(MainContext);
  const [searchResults, setSearchResults] = useState<TravelData | null>(null);
  const [seatInfo, setSeatInfo] = useState<number | null>(null);
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    setIsLoadingSearch(true);

    fetchTravelData(userSearchQuery)
      .then((results) => setSearchResults(results || null))
      .catch((error) => setError("Bir Hata oluştu, lütfen tekrar deneyiniz"));
  }, []);

  useEffect(() => {
    fetchBusSeatData(Number(searchResults?.id))
      .then((results) => {
        const nullCount = results?.filter(
          (seat: BusSeatData) => seat.passengerGender === "null"
        ).length;
        setSeatInfo(nullCount);
        setIsLoadingSearch(false);
      })
      .catch((error) => {
        setError("Bir Hata oluştu, lütfen tekrar deneyiniz");
        setIsLoadingSearch(false);
      });
  }, [searchResults]);
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    router.push(
      `/ticket?id=${searchResults.id}&depart=${searchResults.departCity}&arrival=${searchResults.arrivalCity}`
    );
  };

  const renderResults = () => (
    <Container
      maxWidth="md"
      
      marginBottom= "5%"
      style={{
        marginTop: "200px",
        backgroundColor: "#7C8DDC",
        color: "#fff",
        borderRadius: "10px"
      }}
    >
      <Image
        src={ticket}
        alt="background"
        fill={true}
        style={{ opacity: 0.1, objectFit: "cover" }}
      />
      <Card
        variant="standard"
        sx={{
          padding: "20px",
          marginBottom: "20px",
          backgroundColor: "#7C8DDC",
          color: "#fff",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Bulunan Seferler Aşağıda Listelenmiştir.
        </Typography>

        <Typography paragraph>
          {`${userSearchQuery.departCity}'dan, ${userSearchQuery.arrivalCity}'e, ${userSearchQuery.inputDate} tarihinde uygun seferler`}
        </Typography>
      </Card>
      {searchResults ? (
        <Paper
          sx={{
            marginBottom: "20px",
            backgroundColor: "#7C8DDC",
            color: "#fff",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            style={{ fontWeight: "bold", color: "#fff", fontSize: "28px" }}
          >
            Otobüs Seferleri
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            style={{
              marginBottom: "20px",
              fontWeight: "bold",
              color: "#F9C784",
              fontSize: "20px",
            }}
          >
            Nereden Nereye
          </Typography>
         
          <Typography variant="body1" gutterBottom>
            <InsertInvitationIcon /> Sefer Tarihi: {searchResults.date}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <DirectionsIcon /> Rota: {searchResults.departCity}{" "}
            <ArrowForwardIcon color="action" fontSize="small" />{" "}
            {searchResults.arrivalCity}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <CurrencyLiraIcon /> Bilet Fiyatı: {searchResults.price} ₺
          </Typography>
          <Typography variant="body1" gutterBottom>
            <AirlineSeatLegroomReducedIcon />
            Boş Koltuk Sayısı: {seatInfo}
          </Typography>
          <>
            {isLogin ? (
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{ margin: "1rem 0" }}
                onClick={handleSearchSubmit}
                sx={{ color: "fff", backgroundColor: "#F9C784" }}
              >
                Boş Koltukları Görüntüle
              </Button>
            ) : (
              <>
                <Typography paragraph>
                  Boş koltukları görüntülemek için lütfen giriş yapın
                </Typography>
                <Button variant="contained" color="primary">
                  <Link href="/login" color="inherit">
                    Giriş Yap
                  </Link>
                </Button>
              </>
            )}
          </>
        </Paper>
      ) : isLoadingSearch ? (
        <Paper sx={{ padding: "20px", marginBottom: "20px" }}>
          <Loading />
        </Paper>
      ) : (
        <Paper
          sx={{
            padding: "20px",
            marginBottom: "20px",
            backgroundColor: "#7C8DDC",
            color: "#fff",
            borderRadius: "10px",
          }}
        >
          <Typography variant="h6" color="error" paragraph>
            Uygun Sefer Bulunamadı
          </Typography>
          {error && (
            <Typography variant="body1" color="error" paragraph>
              {error}
            </Typography>
          )}
        </Paper>
      )}
    </Container>
  );



  return (
    <>
      <Container maxWidth="md" className="main">
        <Header />
        <main>{renderResults()}</main>
      </Container>
      <Footer/>
    </>
  );
};

export default SearchResultsPage;
