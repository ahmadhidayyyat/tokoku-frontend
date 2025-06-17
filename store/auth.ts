import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
interface ErrorData {
  msg: string;
  data: any;
  status: string;
}

export type TUser = {
  id: number;
  username: string;
  role: string;
  nama: string;
};

interface DecodedToken {
  exp: number;
}

export const useAuthStore = defineStore("myAuthStore", {
  state: () => ({
    orgName: "HUBDAM",
    appName: "eData Garing",
    appDesc:
      "Aplikasi Analisis Data Eksploratori Pada Desa Garing Kecamatan Tompobulu",
    welcomeText: "Login",
    welcomeDesc:
      "Silahkan masukkan Username dan Password untuk masuk ke aplikasi.",
    loginText: "Login Ke Aplikasi eData Ddesa Garing",
    token: "",
    user: null as TUser | null,
    error: false,
    error_data: null as ErrorData | null,
  }),
  persist: true,
  getters: {
    isTokenExpired: (state) => {
      if (!state.token) return true;

      const currTime = Date.now() / 1000;

      const decodedToken = jwtDecode<DecodedToken>(state.token);

      return decodedToken.exp < currTime;
    },
  },
  actions: {
    async clearToken() {
      this.token = "";
    },
  },
});
