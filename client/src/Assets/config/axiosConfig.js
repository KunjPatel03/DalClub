import Axios from "axios"

const axios = Axios.create({
  baseURL: "http://localhost:3005/api",
})

export default axios