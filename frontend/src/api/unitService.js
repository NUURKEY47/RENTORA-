import api from './axios';

export const getAllUnits = async (query = {}) => {
  const response = await api.get('/units', { params: query });
  return response.data;
};

export const createUnit = async (data) => {
  const response = await api.post('/units', data);
  return response.data;
};

export const updateUnit = async (id, data) => {
  const response = await api.put(`/units/${id}`, data);
  return response.data;
};

export const deleteUnit = async (id) => {
  const response = await api.delete(`/units/${id}`);
  return response.data;
};