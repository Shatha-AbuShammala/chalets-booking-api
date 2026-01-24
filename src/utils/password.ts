import bcrypt from "bcrypt";
 export const hashPassword = async (plain: string): Promise<string> => {
     const saltRounds = 10;
     const hashedPassword = await bcrypt.hash(plain , saltRounds);
     return hashedPassword;
 }
    export const comparePassword = async (plain: string, hash: string): Promise<boolean> => {
    const isMatch = await bcrypt.compare(plain , hash);
    return isMatch;
}