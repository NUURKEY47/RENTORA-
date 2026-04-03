import api from './axios';

export const getAllTenants = async () => {
  const response = await api.get('/tenants');
  return response.data;
};

export const createTenant = async (data) => {
  const response = await api.post('/tenants', data);
  return response.data;
};

export const updateTenant = async (id, data) => {
  const response = await api.put(`/tenants/${id}`, data);
  return response.data;
};

export const deleteTenant = async (id) => {
  const response = await api.delete(`/tenants/${id}`);
  return response.data;
};

export const getTenantDashboard = async () => {
  const response = await api.get('/tenants/dashboard');
  return response.data;
};

export const assignToUnit = async (tenantId, unitId) => {
  const response = await api.post(`/tenants/${tenantId}/assign-unit`, { unitId });
  return response.data;
};