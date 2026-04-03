const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../model/loginmodel");

const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (data) => {
  const { name, phone_number, email, password, blood_type, address } = data;

  const existingUser = await users.findOne({ where: { email } });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const createNewUser = await users.create({
    name,
    phone_number,
    email,
    password: hashPassword,
    blood_type,
    address,
  });

  const payload = {
    id: createNewUser.id,
    email: createNewUser.email,
  };

  // generate token
  const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  return { createNewUser, token };
};

const loginUser = async (data) => {
  const { email, password } = data;
  const existinguser = await users.findOne({ where: { email } });

  if (!existinguser) {
    throw new Error("user is not register");
  }

  const isMatch = await bcrypt.compare(password, existinguser.password);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const payload = {
    id: existinguser.id,
    email: existinguser.email,
  };

  // generate token
  const token = await jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  return {
    user: {
      id: existinguser.id,
      name: existinguser.name,
      email: existinguser.email,
    },
    token,
  };
};

const ForgotPassword = async (data) => {
  const { email, password } = data;
  const existinguser = await users.findOne({ where: { email } });

  if (!existinguser) {
    throw new Error("user is not register");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await users.update({password:hashedPassword},{where:{email}})
  return "Password updated successfully"
};

module.exports = { registerUser, loginUser,ForgotPassword };
