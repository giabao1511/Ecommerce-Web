const cloudinary = require("../utils/cloudinary");

const uploadImgCtrl = {
  uploadImg: async (req, res) => {
    try {
      await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "web-ecommerce",
        },
        (err, data) => {
          if (err) throw err;
          res.status(200).json({
            public_id: data.public_id,
            url: data.secure_url,
          });
        }
      );
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
