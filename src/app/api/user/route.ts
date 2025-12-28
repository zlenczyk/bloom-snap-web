import db from "@/lib/db";
import { hash } from "bcryptjs";
import { z } from "zod";

const userSchema = z.object({
  userName: z
    .string()
    .min(1, "Username is required")
    .max(255, { message: "Username too long. Use up to 255 characters." }),
  email: z.email("Invalid email address").min(1, {
    message: "Email is required",
  }),
  password: z
    .string()
    .min(1, "Password confirmation is required")
    .min(8, "Password must have at least 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, userName, password } = userSchema.parse(body);

    const existingEmail = await db.user.findUnique({ where: { email: email } });

    if (existingEmail) {
      return Response.json(
        {
          user: null,
          message: "User with this email already exist",
        },
        { status: 409 }
      );
    }

    const existingUsername = await db.user.findUnique({
      where: { userName: userName },
    });

    if (existingUsername) {
      return Response.json(
        {
          user: null,
          message: "User with this userName already exist",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        userName,
        email,
        password: hashedPassword,
      },
    });

    const { password: newUserPassword, ...newUserData } = newUser;

    return Response.json(
      { user: newUserData, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create user: ", error);

    return Response.json(
      {
        message: "An error occurred while creating the user",
      },
      { status: 500 }
    );
  }
}
