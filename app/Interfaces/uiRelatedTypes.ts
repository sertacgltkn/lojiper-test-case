export interface LoginFormProps {
  username: string;
  password: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  error: string;
  isLoading: boolean;
  handleLogin: (event: React.FormEvent) => Promise<void>;
  handleRegisterRedirect: () => void;
}

export interface currentUser {
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  email: string;
  firstName: string;
  gender: string;
  lastName: string;
  password: string;
  username: string;
}
export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  username: string;
}

export interface TravelData {
  departCity: string;
  arrivalCity: string;
  date: string;
  id?: number;
  availableSeats?: number;
  price?: number;
}
