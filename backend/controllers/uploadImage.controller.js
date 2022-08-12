const { serviceUpload } = require("../services/product.service");
const cloudinary = require("../utils/cloudinary");

const uploadImgCtrl = {
  uploadImg: async (req, res) => {
    try {
      const { image01, image02 } = req.files;
      const {title} = req.body;
      const imagesArr = [...image01, ...image02];

      const { image01_data, image02_data } = await serviceUpload(imagesArr);


      return res.json({
        title,
        image01_data,
        image02_data,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },

  deleteImg: async (req, res) => {
    try {
      const { public_id } = req.body;

      await cloudinary.uploader.destroy(public_id, (err, data) => {
        if (err) throw err;

        return res.status(200).json({
          msg: "Delete successfully",
        });
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },
};

module.exports = uploadImgCtrl;
