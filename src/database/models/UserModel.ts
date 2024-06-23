import { Schema, model } from 'mongoose';
import UserSchema from '../schemas/UserSchema';
import UserInterface from '../../interfaces/UserInterface';

const UserModel = model<UserInterface>('User', UserSchema);

export default UserModel;