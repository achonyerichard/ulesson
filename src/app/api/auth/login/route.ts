import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { response } from "@/lib/res";
import User from "@/schema/userSchema/userSchema";
import { cookies } from "next/headers";
import dbConnect from "@/lib/db";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET!;
const REFFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET!;
export async function POST(req: Request) {

  const { username, password } = await req.json();
  
  try {
    await dbConnect()
    if (!username || !password) {
      return response(400, "Username and password are required.");
    }
    const foundUser = await User.findOne({ username }).exec();
    console.log(foundUser);
    if (!foundUser) {
      return response(400, "Account does not exist");
    }
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      const roles = Object.values(foundUser.roles);
      // create JWTs
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: roles,
          },
        },
        ACCESS_TOKEN,
        { expiresIn: "24h" }
      );
      const refreshToken = jwt.sign(
        { username: foundUser.username },
        REFFRESH_TOKEN,
        { expiresIn: "1d" }
      );
      // Saving refreshToken with current user
      foundUser.refreshToken = refreshToken;
     
      const result = await foundUser.save();

      console.log(result);
      cookies().set("jwt", refreshToken, { maxAge: 24 * 60 * 60 * 1000 });
      return response(200, "Login Successful", {
        
        token: accessToken,
      });
    } else return response(401, "Invalid Username or Password");
  } catch (err: any) {
    console.log(err)
    return response(500, "Internal Server Error");
  }
}
