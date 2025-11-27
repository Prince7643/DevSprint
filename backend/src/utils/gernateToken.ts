import jwt from "jsonwebtoken";

export const generateToken = (_id: string, res: any) => {
  const jwtToken = jwt.sign({ _id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  res.cookie("token", jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: "none",
    path: "/",
    maxAge: 1000 * 60 * 60 * 24 * 7, 
  });

  return jwtToken;
};
