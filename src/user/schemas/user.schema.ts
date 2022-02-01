import * as mongoose from 'mongoose';

import { User } from '../models/user.model';

const validateEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return String(email).toLowerCase().match(regex);
};

export const UserSchema = new mongoose.Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 200,
      minlength: 3,
      validate: [validateEmail, 'Please fill a valid email address'],
    },
    displayName: {
      type: String,
      required: true,
      maxlength: 200,
      minlength: 2,
      default: null,
    },
    password: {
      type: String,
      required: true,
      maxlength: 200,
      minlength: 2,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
