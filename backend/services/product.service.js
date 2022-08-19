const _PRODUCT = require("../models/Product");
const cloudinary = require("../utils/cloudinary");

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
    colors,
    slug,
    size,
    description,
  }) => {
    try {
      // if (
      //   !title ||
      //   !price ||
      //   !image01 ||
      //   !image02 ||
      //   !categorySlug ||
      //   !colors ||
      //   !slug ||
      //   !size ||
      //   !description
      // ) {
      //   return {
      //     code: 406,
      //     message: "Vui lòng nhập đầy đủ thông tin !",
      //   };
      // }

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
        colors,
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

  serviceGetDetail: async ({ slug }) => {
    try {
      const product = await _PRODUCT.findOne({ slug });

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
    colors,
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

      await _PRODUCT.findByIdAndUpdate(id, {
        title,
        price,
        image01,
        image02,
        categorySlug,
        colors,
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
      await _PRODUCT.findByIdAndDelete(id);

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

  serviceUpload: async (arr, check) => {
    try {
      const dataImg = [];
      if (check) {
        const product = await _PRODUCT.findOne({ slug: check });

        if (product) {
          return {
            error: 404,
            messageErr: "Sản phẩm đã tồn tại",
          };
        }
      }

      for (let item of arr) {
        await cloudinary.uploader.upload(
          item.path,
          {
            folder: process.env.FOLDER_PRODUCT,
          },
          (err, data) => {
            if (err) throw err;
            dataImg.push({ public_id: data.public_id, url: data.secure_url });
          }
        );
      }

      return {
        image01_data: dataImg[0],
        image02_data: dataImg[1],
      };
    } catch (error) {
      return {
        code: 500,
        message: "Error",
      };
    }
  },
};
