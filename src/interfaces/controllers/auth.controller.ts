
import { Request, Response } from "express"
import { registerUser } from "../../application/use-cases/register-user.usecase"

export const registerController = async (req: Request, res: Response) => {
  try {

    console.log("Registering user with data:", req.body);
    const user = await registerUser(req.body)

    res.status(201).json({
      id: user.id,
      email: user.email
    })
  } catch (error: any) {
    res.status(400).json({
      error: error.message
    })
  }
}