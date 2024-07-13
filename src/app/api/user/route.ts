import db from "@/lib/db";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, username, password } = body;

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
      where: { username: username },
    });
    if (existingUsername) {
      return Response.json(
        {
          user: null,
          message: "User with this username already exist",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    return Response.json(
      { user: newUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create user: ", error);

    return Response.json(
      {
        user: null,
        message: "An error occurred while creating the user",
      },
      { status: 500 }
    );
  }
}
