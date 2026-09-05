import api from './axios';

export const createInvoice = async (data) => {
  const response = await api.post('/invoices', data);
  return response.data;
};

export const getAllInvoices = async (params = {}) => {
  const response = await api.get('/invoices', { params });
  return response.data;
};

export const getInvoiceById = async (id) => {
  const response = await api.get(`/invoices/${id}`);
  return response.data;
};
