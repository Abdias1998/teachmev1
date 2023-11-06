const api = "https://teachme-1xw7.onrender.com/v1/";
// const api = "http://localhost:7200/v1/";

const request = {
  login: `${api}/auth/login`,
  register: `${api}/auth/register`,
  forget: `${api}/auth/forget`,
};
export default request;
