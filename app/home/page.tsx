"use client";
import React, { useContext, useState } from "react";
import { MainContext } from "../Context/mainProvider";
import { showToastFail } from "../register/components/ShowToast";
import {toast, ToastContainer} from "react-toastify";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";
import Header from "../components/Header";
import {
  Container,
  Typography,
  Paper,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  TextField,
  Button,
  Link as MuiLink,
} from "@mui/material";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import DoneIcon from "@mui/icons-material/Done";
import Footer from "../components/Footer";

const Home = () => {
  const { setUserSearchQuery } = useContext(MainContext);
  const router = useRouter();
  const [departCity, setDepartCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (departCity === "" || arrivalCity === "" || inputDate === "") {
      showToastFail("Eksik Bilgi Girdiniz");
    } else {
        const userNewSearch = {
          departCity: departCity,
          arrivalCity: arrivalCity,
          inputDate: inputDate,
        };
        setUserSearchQuery(userNewSearch);
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          console.clear();
          router.push("/search");
        }, 2000);
      toast.info("Arama Sayfasına Yönlendiriliyorsunuz, Lütfen Bekleyiniz...");
      return;
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        {isLoading ? (
            <div>
              <Loading />
              <ToastContainer
                  position="top-right"
                  autoClose={5000}
              />
            </div>) :
          (
            <Container maxWidth="sm">
              <Paper elevation={3} style={{ padding: "2rem", borderRadius: "8px", marginTop: "200px" }}>
                <Typography variant="h4" component="h2" gutterBottom>
                  Otobüs Bileti Satın Al
                </Typography>
                <form onSubmit={handleSearchSubmit}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel
                        variant="standard"
                        sx={{ color: "#47299A" }}
                        htmlFor="departure"
                    >
                      {" "}
                      <DepartureBoardIcon />
                      Kalkış Noktası
                    </InputLabel>
                    <Select
                        id="departure"
                        value={departCity}
                        onChange={(e) => setDepartCity(e.target.value)}
                    >
                      <MenuItem value="">Seç</MenuItem>
                      <MenuItem value="Malatya">Malatya</MenuItem>
                      <MenuItem value="Ankara">Ankara</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth margin="normal">
                    <InputLabel
                        variant="standard"
                        sx={{ color: "#47299A" }}
                        htmlFor="arrival"
                    >
                      <DoneIcon />
                      Varış Noktası
                    </InputLabel>
                    <Select
                        id="arrival"
                        value={arrivalCity}
                        onChange={(e) => setArrivalCity(e.target.value)}
                    >
                      <MenuItem value="">Seç</MenuItem>
                      <MenuItem value="İstanbul">İstanbul</MenuItem>
                      <MenuItem value="Antalya">Antalya</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth margin="normal">
                    <InputLabel htmlFor="date"></InputLabel>
                    <TextField
                        type="date"
                        id="date"
                        InputLabelProps={{ shrink: true }}
                        value={inputDate}
                        onChange={(e) => setInputDate(e.target.value)}
                    />
                  </FormControl>

                  <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{ margin: "1rem 0" }}
                  >
                    Ara
                  </Button>
                </form>
              </Paper>
            </Container>
          )}
        <Header />
      </Container>
      <Footer/>
    </>
  );
};
export default Home;