import axios from "axios";

const BASE_URL = "http://localhost:5000/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMDk4NzcxMmI4YTIzNjg1OWQ4MTMyYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NDc5MTg5NiwiZXhwIjoxNjQ1MDUxMDk2fQ.yIqyKdffxDzHE1q5sQMgqW7iKiZdRVHEYHyjWfdxl7A"


export const publicRequest = axios.create({
    baseURL : BASE_URL,
})

export const userRequest = axios.create({
    baseURL : BASE_URL,
    header: {token: `Bearer ${TOKEN}`}
})