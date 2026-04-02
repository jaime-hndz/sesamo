import { z } from "zod"
import { hashPassword } from "../../utils/hast"
import { createUser, findUserByEmail } from "../../infrastructure/respositories/user.respository"

const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6)
})

export const registerUser = async (input: unknown) => {
  const data = registerSchema.parse(input)

  const existingUser = await findUserByEmail(data.email)

  if (existingUser) {
    throw new Error("User already exists")
  }

  const password_hash = await hashPassword(data.password)

  const user = await createUser({
    email: data.email,
    password_hash
  })

  return user
}