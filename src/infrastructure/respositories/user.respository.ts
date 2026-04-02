import { prisma } from "../../lib/prisma"

export const createUser = async (data: {
  email: string
  password_hash: string
}) => {
  return prisma.user.create({
    data: {
      email: data.email,
      password_hash: data.password_hash,
      provider: "local"
    }
  })
}

export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email }
  })
}