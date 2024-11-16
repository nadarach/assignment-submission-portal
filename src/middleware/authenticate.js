const jwt = require('jsonwebtoken');
const User = require('../models/user');

//Middleware to authenticate a user using a JSON Web Token (JWT)
const authenticate = async (req, res, next) => {
  try {
    //Extract the JWT from the 'Authorization' header of the request
    const token = req.header("Authorization").replace("Bearer ", "");

    //Verify the token using the secret key defined in the environment variable and retrieve its decoded version
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //Fetch the user from the database using the user's ID extracted from the token and the token
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("An error occurred when fetching user");
    }

    //Attach the token and the user to the request object
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }

}

module.exports = authenticate