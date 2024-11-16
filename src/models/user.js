const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) throw new Error('Email is invalid');
    }
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (value.length < 6) throw new Error('Password length must be greater than 6 characters.');
    }
  },
  role: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    enum: ['admin', 'user']
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

//Virtual for assignments created by the user (user role)
userSchema.virtual('createdAssignments', {
  ref: 'Assignment',
  localField: '_id',
  foreignField: 'userId'
})

//Virtual for assignments reviewed by the user (admin role)
userSchema.virtual("reviewedAssignments", {
  ref: "Assignment",
  localField: "_id",
  foreignField: "admin",
});

//Return the public profile of a user (sensitive data hidden)
userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
}


//Generate an authentification token for a logged in user
userSchema.methods.generateAuthToken = async function () {
  const user = this;

  //generate the token using the secret key
  const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET);

  //add token to the user's list of tokens
  user.tokens = user.tokens.concat({ token });

  //save the new user information
  user.save();
  return token;
}


//Retrieve a user from the database by their credentials
userSchema.statics.findByCredentials = async (email, password) => {
  //fetch the user by their email address from the database
  const user = await User.findOne({ email });

  //if user is not found in the db, an error is thrown
  if (!user) {
    throw new Error('Unable to log in (email or password is invalid).');
  }

  //if a user is found, verify that the password provided martches the hashed password stored in the database
  const isMatch = bcrypt.compare(password, user.password);

  //if the passwords don't match, an error is thrown
  if (!isMatch) {
    throw new Error('Unable to log in (email or password is invalid).');
  }

  return user;
}


//Hash the plain text password before saving it
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
})

const User = mongoose.model('User', userSchema);
module.exports = User