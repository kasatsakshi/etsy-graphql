import bcrypt from 'bcrypt';
import { createEntity, findOneEntity } from '../models';
import { isValidEmail } from '../helpers/validator';
import User from '../models/users';
import { signToken } from '../helpers/auth';

function cleanInput(input) {
  const {
    email,
    name,
  } = input;

  input.email = email.trim();
  input.name = name.trim();

  return input;
}

async function validateInput(input) {
  const {
    email,
    password,
    name,
  } = input;

  let errorMsg;
  if (!name) {
    errorMsg = 'Name is missing';
  } else if (!email) {
    errorMsg = 'Email is missing';
  } else if (!password) {
    errorMsg = 'Password is missing';
  }

  if (!isValidEmail(email)) {
    errorMsg = 'Email is in incorrect format';
  }

  if (errorMsg) {
    return errorMsg;
  }

  return null;
}

export default async function signup(body) {
  const input = body.input;
  const trimmedInput = cleanInput(input);
  const inputError = await validateInput(trimmedInput);

  if (inputError) {
    throw new Error(inputError);
  }

  const findUser = await findOneEntity(User, { email: trimmedInput.email });

  // Check if this user email exists
  if (findUser) {
    throw new Error('Email Address already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(trimmedInput.password, salt);
  trimmedInput.password = hashedPassword;

  const userData = new User({
    ...trimmedInput,
    userLevel: 0,
    userStatus: 'active',
    lastLoginAt: new Date(),
  });
  const createdUser = await createEntity(userData);

  if (!createdUser) {
    throw new Error('Signup failed. Try again');
  }

  const response = ({ ...createdUser }._doc);

  // Generate JWT token
  const token = await signToken(createdUser);

  const finalResponse = { ...response };
  finalResponse.token = token;
  return finalResponse;
}
