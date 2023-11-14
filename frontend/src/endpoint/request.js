// const api = "https://teachme-1xw7.onrender.com/v1";
const api = "http://localhost:7200/v1/";

const request = {
  register: `${api}/auth/register`,
  login: `${api}/auth/login`,
  forget: `${api}/auth/forget`,
  reset: `${api}/auth/reset`,

  user_info: `${api}/user_info`,
};
export default request;
