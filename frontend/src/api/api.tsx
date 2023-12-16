import axios from "axios";

export const signup = async (userid: string, password: string) => {
  const formData = new FormData();
  formData.append("userid", userid);
  formData.append("password", password);

  const response = await axios.post("http://localhost:8080/signup", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

export const signin = async (userid: string, password: string) => {
  const formData = new FormData();
  formData.append("userid", userid);
  formData.append("password", password);

  const response = await axios.post("http://localhost:8080/signin", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data;
};

export const getNoteList = async (userid: string) => {
  const { data } = await axios.get(`http://localhost:8080/getNoteList/${userid}`);
  return data;
};
