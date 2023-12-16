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

export const uploadSpeech = async (
  userid: string,
  notename: string,
  file: File
) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `http://localhost:8080/uploadSpeech/${userid}/${notename}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getNoteList = async (userid: string) => {
  const { data } = await axios.get(
    `http://localhost:8080/getNoteList/${userid}`
  );
  return data;
};

export const getNote = async (userid: string, notename: string) => {
  const { data } = await axios.get(
    `http://localhost:8080/getNote/${userid}/${notename}`
  );
  return data;
};

export const getQa = async (
  userid: string,
  notename: string,
  query: string
) => {
  const { data } = await axios.get(
    `http://localhost:8080/getQa/${userid}/${notename}/${query}`
  );
  return data;
};

export const deleteNote = async (userid: string, notename: string) => {
  const { data } = await axios.delete(
    `http://localhost:8080/deleteFile/${userid}/${notename}`
  );
  return data;
};

export const uploadMemo = async (
  userid: string,
  notename: string,
  contents: string
) => {
  const formData = new FormData();
  formData.append("contents", contents);
  const response = await axios.post(
    `http://localhost:8080/uploadMemo/${userid}/${notename}`,
    formData,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data;
};
