import api from './axios';

export const getAllProperties = async () => {
  const response = await api.get('/properties');
  return response.data;
};

export const createProperty = async (data) => {
  const response = await api.post('/properties', data);
  return response.data;
};

export const updateProperty = async (id, data) => {
  const response = await api.put(`/properties/${id}`, data);
  return response.data;
};

export const deleteProperty = async (id) => {
  const response = await api.delete(`/properties/${id}`);
  return response.data;
};

export const assignLandlord = async (propertyId, landlordId) => {
  const response = await api.put(`/properties/${propertyId}/assign-landlord`, { landlordId });
  return response.data;
};