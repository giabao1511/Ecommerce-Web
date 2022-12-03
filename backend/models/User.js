const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      require: true,
    },

    role: {
      type: Number,
      default: 0,
    },

    avatar: {
      type: Object,
      default: {
        public_id: "15112003",
        url: "https://res.cloudinary.com/dfupi3m0b/image/upload/v1661615195/web-ecommerce/default-profile-icon-24_ydywet.jpg",
      },
    },

    cart: {
      type: Object, 
      default: {
        
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
