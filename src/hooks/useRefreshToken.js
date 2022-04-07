import { axiosInstance } from "../api/axios";
import { useAuth } from "./useAuth";

export const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const res = await axiosInstance.get("/auth/refresh", {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev.accessToken));
      console.log(JSON.stringify(res.data.accessToken));
      return { ...prev, accessToken: res.data.accessToken };
    });

    return res.data.accessToken;
  };
  return refresh;
};
