import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import { isValidEmail } from '../helpers/validator';
import {
  findOneEntity, updateOneEntity,
} from '../models';
import { decodeToken } from '../helpers/auth';
import User from '../models/users';

function cleanInput(input) {
  const {
    email,
  } = input;

  input.email = email.trim();

  return input;
}

async function validateInput(input) {
  const {
    email,
  } = input;

  let errorMsg;
  if (!email) {
    errorMsg = 'Email is missing';
  }

  if (!isValidEmail(email)) {
    errorMsg = 'Email is in incorrect format';
  }

  if (errorMsg) {
    return errorMsg;
  }

  return null;
}

export async function user(context) {
  const { req } = context;
  const token = req.headers.authorization;
  const payload = await decodeToken(token);
  const input = payload.data;
  const trimmedInput = cleanInput(input);
  const inputError = await validateInput(trimmedInput);

  if (inputError) {
    throw new Error(inputError);
  }

  const findUser = await findOneEntity(User, { email: trimmedInput.email });
  // Check if this user email exists
  if (!findUser) {
    console.error('Email does not exists!');
    // Adding the below message so someone cannot create fake accounts
    throw new Error('User does not exists');
  }

  const response = ({ ...findUser }._doc);
  return response;
}

export async function updateCurrency(context, args) {
  const { req } = context;
  const token = req.headers.authorization;
  const payload = await decodeToken(token);
  const { id, email } = payload.data;
  const { currency } = args.input;

  const findUser = await findOneEntity(User, { email });
  // Check if this user exists
  if (!findUser) {
    console.error('User does not exists!');
    throw new Error('User does not exists');
  }

  await updateOneEntity(User, { _id: id }, { currency });

  const findUpdatedUser = await findOneEntity(User, { _id: id });
  const response = ({ ...findUpdatedUser }._doc);

  return response;
}

export async function update(context, args) {
  const { req } = context;
  const token = req.headers.authorization;
  const payload = await decodeToken(token);
  const userId = payload.data.id;
  const {
    name, bio, address, phone, email, gender, birthday, avatarUrl,
  } = args.input;

  const user = await findOneEntity(User, { _id: userId });
  // Check if this user exists
  if (!user) {
    throw new Error("User doesn't exists");
  }

  await updateOneEntity(User, { _id: userId }, {
    name, bio, phone, email, address, avatarUrl, gender, birthday, updatedAt: new Date(),
  });

  const findUpdatedUser = await findOneEntity(User, { _id: userId });

  const response = ({ ...findUpdatedUser }._doc);

  return response;
}
