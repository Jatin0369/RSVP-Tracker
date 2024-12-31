import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// API endpoints
export const createEvent = (eventData) => API.post('/events', eventData);
export const fetchEvent = (id) => API.get(`/events/${id}`);
export const updateQuestions = (id, questions) =>
  API.patch(`/events/${id}/questions`, questions);
export const submitResponse = (id, response) =>
  API.post(`/events/${id}/response`, response);

export default API;
