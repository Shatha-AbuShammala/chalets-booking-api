import mongoose , {Schema} from 'mongoose';
export type UserRole = 'customer' | 'owner' | 'admin';
export type User ={
    name: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<User>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, trim: true , lowercase: true, index: true},
    passwordHash: {type: String, required: true},
    role: {type: String,required: true , enum: ['customer', 'owner', 'admin'], default: 'customer'},
},{ timestamps: true });

export const UserModel = mongoose.model<User>('User', UserSchema);