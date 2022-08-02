const _PRODUCT = require("../models/Product.model");

module.exports = {
  serviceGetAll: async () => {
    try {
      const product = await _PRODUCT.find();

      return {
        code: 200,
        message: "Get all products successfully !",
        element: product,
      };
    } catch (error) {
      return {
        code: 500,
        message: "Error",
      };
    }
  },

  serviceCreate: async ({
    title,
    price,
    image01,
    image02,
    categorySlug,
    color,
    slug,
    size,
    description,
  }) => {
    try {
      if (
        !title ||
        !price ||
        !image01 ||
        !image02 ||
        !categorySlug ||
        !color ||
        !slug ||
        !size ||
        !description
      ) {
        return {
          code: 406,
          message: "Vui lòng nhập đầy đủ thông tin !",
        };
      }

      const checkExists = await _PRODUCT.findOne({ slug });

      if (checkExists) {
        return {
          code: 406,
          message: "Sản phẩm đã tồn tại !",
        };
      }

      const product = await _PRODUCT.create({
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

      return {
        code: 200,
        message: "Create product successfully",
        element: product,
      };
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  },

  serviceGetDetail: async ({ id }) => {
    try {
      const product = await _PRODUCT.findById(id);
      
      console.log(product);

      if (!product) {
        return {
          code: 404,
          message: "Không tìm thấy sản phẩm này",
        };
      }

      return {
        code: 200,
        message: "Get detail product successfully",
        element: product,
      };
    } catch (error) {
      return {
        code: 500,
        message: "Error",
      };
    }
  },

  serviceUpdate: async ({
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
  }) => {
    try {
      const checkExists = await _PRODUCT.findOne({ slug });
      if (checkExists) {
        return {
          code: 406,
          message: "Sản phẩm đã tồn tại !",
        };
      }

      const product = await _PRODUCT.findByIdAndUpdate(id, {
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

      return {
        code: 200,
        message: "Update product successfully",
      };
    } catch (error) {
      return {
        code: 500,
        message: "Error",
      };
    }
  },

  serviceDelete: async ({ id }) => {
    try {
      const product = await _PRODUCT.findByIdAndDelete(id);

      return {
        code: 200,
        message: "Delete product successfully",
      };
    } catch (error) {
      return {
        code: 500,
        message: "Error",
      };
    }
  },
};
