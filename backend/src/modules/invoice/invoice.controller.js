import { invoiceService } from "./invoice.service.js";
import sendResponse from "../../utils/sendResponse.js";
import AppError from "../../utils/AppError.js";

export const createInvoice = async (req, res, next) => {
  try {
    const invoice = await invoiceService.createInvoice(req.body, req.user);
    sendResponse(res, {
      statusCode: 201,
      message: "Invoice generated successfully",
      data: invoice
    });
  } catch (error) {
    next(error);
  }
};

export const getAllInvoices = async (req, res, next) => {
  try {
    const invoices = await invoiceService.getAllInvoices(req.query, req.user);
    sendResponse(res, {
      message: "Invoices fetched successfully",
      data: invoices
    });
  } catch (error) {
    next(error);
  }
};

export const getInvoiceById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
      throw new AppError("Invalid invoice ID", 400);
    }
    const invoice = await invoiceService.getInvoiceById(id, req.user);
    sendResponse(res, {
      message: "Invoice details fetched successfully",
      data: invoice
    });
  } catch (error) {
    next(error);
  }
};
