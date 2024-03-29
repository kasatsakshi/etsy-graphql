import axios from 'axios';
import { GraphQLClient } from 'graphql-request';

// export const BASE = "http://34.238.124.46:8080";
// const BASE_URL = "http://34.238.124.46:8080/api/";
export const BASE = 'http://localhost:8080';
const BASE_URL = 'http://localhost:8080/api/';
const TOKEN = localStorage.getItem('token');

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const publicRequestClient = new GraphQLClient(`${BASE}/graph`, { headers: {} });
export const userRequestClient = new GraphQLClient(BASE_URL, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
