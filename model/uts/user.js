const mongoose = require("mongoose");

const validator = require("mongoose-unique-validator");
const user_schema = mongoose.Schema(
  {
    // Information saisie par l'user
    pseudo: {
      type: String,
      required: true,
      unique: true,
      required: () => !this.email,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: () => !this.pseudo,
    },

    password: {
      type: String,
      required: true,
    },
    //
    //   role des utilisateurs
    admin: {
      type: Boolean,
      default: false,
    },

    //
    // information dynamique
    country: {
      type: String,
      default: "",
    },
    reset_password_token: {
      type: String,
      default: "",
    },
    reset_password_expires: {
      type: Date,
      default: "",
    },
    profil: {
      type: String,
      default: "./assets/images/user.png",
    },
    followers: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);
user_schema.plugin(validator);
const User = mongoose.model("user", user_schema);
module.exports = User;
