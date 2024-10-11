import { useState } from "react";
import axios from "axios";

// import { subscribeUser } from 'utils/subscription';

const useStudents = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data,setData]= useState<any>({});
  // const navigate = useNavigate();
  // const { currentRole, setCurrentRole } = useCurrentRole();
  // No longer manage loginState here; it will be managed by AuthProvider via context

  const addStudent = async (data: any) => {
    setIsLoading(true);

    try {
      const response = await axios.post(`/api/student`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        return response.data;
      }
      // subscribeUser(response.data.data.token);

      // I'll add a check here when a user has multiple roles
    } catch (error) {
      // alert(error.message);
      return error
    } finally {
      setIsLoading(false);
    }
  };
  const getSingleStudent = async (id: any) => {
    setIsLoading(true);

    try {
      const response = await axios.get(`/api/student/${id}`,  {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.data) {
       setData(response.data.data)
      }
      // subscribeUser(response.data.data.token);

      // I'll add a check here when a user has multiple roles
    } catch (error) {
      // alert(error.message);
      return error
    } finally {
      setIsLoading(false);
    }
  };
  const getStudent = async (data: any) => {
    setIsLoading(true);

    try {
      const response = await axios.get(`/api/student`,  {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response?.data) {
        return response?.data?.data;
      }
      // subscribeUser(response.data.data.token);

      // I'll add a check here when a user has multiple roles
    } catch (error) {
      // alert(error.message);
      return error
    } finally {
      setIsLoading(false);
    }
  };
  const editStudent = async (data: any,id: any,refetch:()=>{},close:any) => {
    setIsLoading(true)
    try {
      const response = await axios.put(`/api/student/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data) {
        setIsLoading(false)
        refetch()
        close()
        return response.data;
        
      }

      // subscribeUser(response.data.data.token);

      // I'll add a check here when a user has multiple roles
    } catch (error) {
      // alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteStudent = async (id: any) => {
    try {
      const response = await axios.delete(`/api/student/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data) {
        return response.data;
      }

      // subscribeUser(response.data.data.token);

      // I'll add a check here when a user has multiple roles
    } catch (error) {
      // alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { addStudent, isLoading, editStudent,getStudent,deleteStudent,getSingleStudent, data };
};

export default useStudents;
