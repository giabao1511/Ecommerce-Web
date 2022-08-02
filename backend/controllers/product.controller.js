const {
  serviceGetAll,
  serviceCreate,
  serviceUpdate,
  serviceGetDetail,
  serviceDelete,
} = require("../services/product.service");

const productCtrl = {
  getAllProducts: async (req, res) => {
    try {
      const { code, message, element } = await serviceGetAll();
      return res.status(code).json({
        message,
        element,
      });
    } catch (error) {
      return res.status(code).json({
        error,
        message,
      });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        title,
        price,
        image01,
        image02,
        categorySlug,
        color,
        slug,
        size,
        description,
      } = req.body;

      const { code, message, element } = await serviceCreate({
        title,
        price,
        image01,
        image02,
        categorySlug,
        color,
        slug,
        size,
        description,
      });

      return res.status(code).json({
        message,
        element,
      });
    } catch (error) {
      return res.status(code).json({
        error,
        message,
      });
    }
  },
  editProduct: async (req, res) => {
    try {
      const {
        title,
        price,
        image01,
        image02,
        categorySlug,
        color,
        slug,
        size,
        description,
      } = req.body;

      const id = req.params.id;

      const { code, message, element } = await serviceUpdate({
        id,
        title,
        price,
        image01,
        image02,
        categorySlug,
        color,
        slug,
        size,
        description,
      });

      return res.status(code).json({
        message,
      });
    } catch (error) {
      return res.status(code).json({
        error,
        message,
      });
    }
  },
  getDetailProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const { code, message, element } = await serviceGetDetail({ id });

      return res.status(code).json({
        message,
        element,
      });
    } catch (error) {
      return res.status(code).json({
        error,
        message,
      });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const { code, message } = await serviceDelete({ id });

      return res.status(code).json({
        message,
      });
    } catch (error) {
      return res.status(code).json({
        error,
        message,
      });
    }
  },
};

module.exports = productCtrl;
