import api from './axios';

export const getLandlords = async () => {
  return await api.get('/landlords');
};

export const getLandlordById = async (id) => {
  return await api.get(`/landlords/${id}`);
};

export const createLandlord = async (data) => {
  const response = await api.post('/landlords', data);
  return response.data;
};

export const updateLandlord = async (id, data) => {
  const response = await api.put(`/landlords/${id}`, data);
  return response.data;
};

export const deleteLandlord = async (id) => {
  const response = await api.delete(`/landlords/${id}`);
  return response.data;
};

export const getLandlordDashboard = async () => {
  const response = await api.get('/landlords/dashboard');
  return response.data;
};
