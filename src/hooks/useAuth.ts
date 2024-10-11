import { useState } from "react";
import axios from "axios";
import JWT from "jsonwebtoken";

import { deleteCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

// import { subscribeUser } from 'utils/subscription';

const useAuth = () => {
  const toast = useToast();
  const positions = [
    "top",
    "top-right",
    "top-left",
    "bottom",
    "bottom-right",
    "bottom-left",
  ];

  const BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  // const { currentRole, setCurrentRole } = useCurrentRole();
  // No longer manage loginState here; it will be managed by AuthProvider via context

  const login = async (data: any) => {
    // Add setIsLoggedIn as parameter
    setIsLoading(true);
    try {
      const response = await axios.post(
        `/api/auth/login`,
        
          data,
        
        {
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": localStorage.getItem("i18nextLng"),
          },
        }
      );

      // subscribeUser(response.data.data.token);

      if (response?.data) {
        toast({
          title: `Login Successful`,
          status: "success",
          position: "top",
          isClosable: true,
        });
        window?.localStorage.setItem(
          "ulesson-token",
          response?.data?.data?.token
        );

        setCookie("ulesson-token", response?.data?.data?.token);
        window.location.reload();
      }
    } catch (error:any) {
      // alert(error.message);
      console.log("new", error);
      toast({
        title: `${error?.response?.data?.message}`,
        position: "top",
        status: "error",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Simplify logout function for clarity
  const logout = () => {
    // Add setIsLoggedIn as parameter

    // make request to login logs endpoint

    window?.localStorage.removeItem("ulesson-token");
    deleteCookie("ulesson-token");

    router.push("/login");
  };

  return { login, logout, isLoading };
};

export default useAuth;
