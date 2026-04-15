/*
  Warnings:

  - You are about to drop the column `refresh_token` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `revoked` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token_hash]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token_hash` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "refresh_token",
DROP COLUMN "revoked",
ADD COLUMN     "revoked_at" TIMESTAMP(3),
ADD COLUMN     "token_hash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_hash_key" ON "Session"("token_hash");
