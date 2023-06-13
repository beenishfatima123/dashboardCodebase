import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const loggedInObject = JSON.parse(localStorage.getItem("logged_in"));
const token = loggedInObject?.token;

export const fetchTrendsData = async (country, city, area) => {
  try {
    const response = await api.get(
      `users/property/trends?country=${country}&city=${city}&area=${area}`
    );
    if (response) {
      return response.data;
    } else {
      return false;
    }
    // console.log({ response });
  } catch (error) {
    console.log("error in: fetchTrendsData", { error });
    return false;
  }
};

export const checkUniqueEmailExists = async (email) => {
  try {
    const response = await api.get(`users/unique-email/?email=${email}`);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error in: checkUniqueEmailExists", { error });
    return false;
  }
};

export const linkAccountsWithDb = async (data) => {
  try {
    const response = await api.post(`users/api/login`, data);
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error in: linkAccountsWithDb", { error });
    return false;
  }
};

export const checkUniqueValidity = async (email) => {
  try {
    const response = await api.get(`users/unique-email/?email=${email}`);
    if (response) {
      return response.data;
    } else {
      return false;
    }
    // console.log({ response });
  } catch (error) {
    console.log("error in: fetchTrendsData", { error });
    return false;
  }
};

export const checkUniqueUsernameValidity = async (username) => {
  try {
    const response = await api.get(
      `users/unique-username/?username=${username}`
    );
    if (response) {
      return response.data;
    } else {
      return false;
    }
    // console.log({ response });
  } catch (error) {
    console.log("error in: fetchTrendsData", { error });
    return false;
  }
};

export const checkUniqueIdValidity = async (cnic) => {
  try {
    const response = await api.get(`users/unique-cnic/?cnic=${cnic}`);
    if (response) {
      return response.data;
    } else {
      return false;
    }
    // console.log({ response });
  } catch (error) {
    console.log("error in: fetchTrendsData", { error });
    return false;
  }
};

export const addAgentToDatabase = async (data) => {
  try {
    const response = await api.post(`users/user/`, data);
    if (response) {
      return response.data;
    } else {
      return false;
    }
    // console.log({ response });
  } catch (error) {
    console.log("error in: addAgentToDatabase", { error });
    return false;
  }
};

export const deleteAgentfromDatabase = async (id) => {
  try {
    const response = await api.delete(`users/user/${id}`);
    toast.info("Agent Deleted SuccessFully");
    if (response) {
      return response.data;
    } else {
      return false;
    }
    // console.log({ response });
  } catch (error) {
    console.log("error in: deleteAgentToDatabase", { error });
    return false;
  }
};

export const deleteAgencyfromDatabase = async (id) => {
  try {
    const loggedInObject = JSON.parse(localStorage.getItem("logged_in"));
    const token = loggedInObject?.token;
    // const token= localStorage.getItem("token");
    const response = await api.delete(`users/company/${id}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    toast.info("Agency Deleted SuccessFully");
    if (response) {
      return response.data;
    } else {
      return false;
    }
    // console.log({ response });
  } catch (error) {
    console.log("error in: deleteAgencyToDatabase", { error });
    return false;
  }
};

export const verifyAgent = async (code) => {
  try {
    const response = await api.post(`users/confirm/verify`, {
      code,
    });
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log({ error });
    return false;
  }
};

export const reVerify = async (email) => {
  try {
    const response = await api.post(`users/verification/code`, { email });
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log({ error });
    return false;
  }
};

export const fetchTutorialVideo = async (token) => {
  try {
    const response = await api.get(`users/video-course/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (response) {
      return response.data;
    } else {
      return false;
    }
    // console.log({ response });
  } catch (error) {
    console.log("error in: fetchTutorialVideo", { error });
    return false;
  }
};

export const fetchTutorialQuestions = async (token) => {
  try {
    const response = await api.get(`users/course/performance/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    if (response) {
      return response.data;
    } else {
      return false;
    }
    // console.log({ response });
  } catch (error) {
    console.log("error in: fetchTutorialQuestions", { error });
    return false;
  }
};

export const AddBlogToDB = async (data) => {
  try {
    const loggedInObject = JSON.parse(localStorage.getItem("logged_in"));
    const token = loggedInObject?.token;
    // const token= localStorage.getItem("token");
    const response = await api.post(`users/blogs/`, data, {
      headers: {
        Authorization: `token ${token}`,
        "Content-type": "multipart/form-data",
      },
    });
    if (response) {
      return response.data;
    } else {
      return false;
    }
    // console.log({ response });
  } catch (error) {
    console.log("error in: addAgentToDatabase", { error });
    return false;
  }
};

export const updateProject = async (data) => {
  try {
    console.log("woah");
    const response = await api.put(
      `users/new-project/${data?.id}/`,
      data?.values,
      {
        headers: {
          Authorization: `token ${data?.token}`,
        },
      }
    );
    if (response) {
      return response.data;
    } else {
      return false;
    }
    // console.log({ response });
  } catch (error) {
    console.log("error in: updateProject", { error });
    return false;
  }
};

export const postContent = async (data) => {
  try {
    const response = await api.post(`/users/project-content/`, data?.values, {
      headers: {
        Authorization: `token ${token}`,
        "Content-type": "multipart/form-data",
      },
    });
    if (response) {
      return response.data;
    } else return false;
  } catch (error) {
    console.log("error in: postContent", { error });
    return false;
  }
};

export const updateContent = async (data) => {
  try {
    const loggedInObject = JSON.parse(localStorage.getItem("logged_in"));
    const token = loggedInObject?.token;
    const response = await api.put(
      `/users/project-content/${data.id}/`,
      data?.values,
      {
        headers: {
          Authorization: `token ${token}`,
          "Content-type": "multipart/form-data",
        },
      }
    );
    if (response) {
      return response.data;
    } else return false;
  } catch (error) {
    console.log("error in: updateContent", { error });
    return false;
  }
};

export const deleteContent = async (data) => {
  try {
    const loggedInObject = JSON.parse(localStorage.getItem("logged_in"));
    const token = loggedInObject?.token;

    const response = await api.delete(`/users/newproject-content/${data.id}/`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    if (response) {
      return response.data;
    } else return false;
  } catch (error) {
    console.log("error in: delete content", { error });
    return false;
  }
};

export const deleteContentImage = async (data) => {
  try {
    const loggedInObject = JSON.parse(localStorage.getItem("logged_in"));
    const token = loggedInObject?.token;

    const response = await api.delete(`/users/content-images/${data.id}/`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    if (response) {
      return response.data;
    } else return false;
  } catch (error) {
    console.log("error in: delete content", { error });
    return false;
  }
};

export const AddAgencyToDB = async (data) => {
  try {
    console.log("Add agency to db");
    const loggedInObject = JSON.parse(localStorage.getItem("logged_in"));
    const token = loggedInObject?.token;
    const response = await api.post(`users/company/`, data, {
      headers: {
        Authorization: `token ${token}`,
        "Content-type": "multipart/form-data",
      },
    });
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error in: addAgenctyToDatabase", { error });
    return false;
  }
};

export const AddNewsToDB = async (data) => {
  try {
    const loggedInObject = JSON.parse(localStorage.getItem("logged_in"));
    const token = loggedInObject?.token;

    const response = await api.post(`users/news/`, data, {
      headers: {
        Authorization: `token ${token}`,
        "Content-type": "multipart/form-data",
      },
    });
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error in: AddNewsToDB", { error });
    return false;
  }
};

export const fetchNewsCategories = async () => {
  try {
    const loggedInObject = JSON.parse(localStorage.getItem("logged_in"));
    const token = loggedInObject?.token;
    const response = await api.get(`users/news-category/`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    if (response) {
      return response?.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error in: fetchNewsCategories", { error });
    return false;
  }
};

export const loginUserWithDb = async (data) => {
  try {
    const response = await api.post(`users/api/login`, data);
    return response?.data;
  } catch (error) {
    console.log("error in: loginUserWithDb", { error });
    if (error?.response?.data?.message === "your account is not verified") {
      return "your account is not verified";
    }
    return false;
  }
};

export const fetchCompanies = async () => {
  try {
    const response = await api.get(`users/company/`);
    if (response) {
      return response?.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error in: fetchCompanies", { error });
    return false;
  }
};

export const AddProjectToDB = async (authToken, data) => {
  try {
    const response = await api.post(`users/new-project/`, data, {
      headers: {
        Authorization: `token ${authToken}`,
        "Content-type": "multipart/form-data",
      },
    });
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error in: AddProjectToDB", { error });
    return false;
  }
};

export const addProjectContent = async (authToken, data) => {
  try {
    const response = await api.post(`users/newproject-content/`, data, {
      headers: {
        Authorization: `token ${authToken}`,
        "Content-type": "multipart/form-data",
      },
    });
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error in: addProjectContent", { error });
    return false;
  }
};

export const updateProjectContent = async (authToken, data) => {
  try {
    const response = await api.put(
      `/users/newproject-content/${data.id}/`,
      data?.values,
      {
        headers: {
          Authorization: `token ${authToken}`,
          "Content-type": "multipart/form-data",
        },
      }
    );
    if (response) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error in: updateProjectContent", { error });
    return false;
  }
};

export const updateContent1 = async (data) => {
  try {
    const loggedInObject = JSON.parse(localStorage.getItem("logged_in"));
    const token = loggedInObject?.token;
    const response = await api.put(
      `/users/project-content/${data.id}/`,
      data?.values,
      {
        headers: {
          Authorization: `token ${token}`,
          "Content-type": "multipart/form-data",
        },
      }
    );
    if (response) {
      return response.data;
    } else return false;
  } catch (error) {
    console.log("error in: updateContent", { error });
    return false;
  }
};
