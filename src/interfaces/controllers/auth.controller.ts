
import { Request, Response } from "express"
import { registerUser } from "../../application/use-cases/register-user.usecase"
import { AppError } from "../../errors/AppError";
import { loginUser } from "../../application/use-cases/login-user.usecase"
import { refreshToken } from "../../application/use-cases/refresh-token.usecase"
import { logoutUser } from "../../application/use-cases/logout-user.usecase"

export const registerController = async (req: Request, res: Response) => {
  try {

    console.log("Registering user with data:", req.body);
    const user = await registerUser(req.body)

    res.status(201).json({
      id: user.id,
      email: user.email
    })
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    res.status(500).json({ error: "Internal server error" })
  }
}

export const loginController = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken } = await loginUser(req.body)

    res.status(200).json({ accessToken, refreshToken })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    res.status(500).json({ error: "Internal server error" })
  }
}


export const refreshController = async (req: Request, res: Response) => {
  try {
    const tokens = await refreshToken(req.body)
    res.status(200).json(tokens)
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ error: error.message })
    }
    res.status(500).json({ error: "Internal server error" })
  }
}