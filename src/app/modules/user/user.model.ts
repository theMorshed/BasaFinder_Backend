import { model, Model, Schema } from "mongoose";
import config from "../../config";
import bcrypt from 'bcryptjs';
import { IUser } from "./user.interface";

// Create the User Schema
const UserSchema: Schema<IUser> = new Schema(
{
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone is required'],
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
        type: String,        
        default: 'tenant'
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);

/**
 * Pre-save middleware for hashing passwords.
 * This middleware hashes the user's password before saving it to the database.
 */
// UserSchema.pre('save', async function(next) {
//     this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
//     next();
// });
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Hash only if password is modified

  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
  next();
});

/**
 * Post-save middleware for clearing the password field.
 * This middleware removes the password from the saved document for security purposes.
 */
UserSchema.post('save', function(doc, next) {
    doc.password = '';
    next();
});

/**
 * Custom toJSON method to modify the output of user documents.
 * This method removes `__v`, `createdAt`, and `updatedAt` fields from the response.
 */
UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
    },
});

/**
 * User Model
 * 
 * The `User` model provides an interface to interact with the User collection in the MongoDB database.
 */
const User: Model<IUser> = model<IUser>('User', UserSchema);

export default User;