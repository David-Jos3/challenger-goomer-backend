/*
  Warnings:

  - The primary key for the `opening_hours` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `promotion_times` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "opening_hours" DROP CONSTRAINT "opening_hours_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "opening_hours_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "opening_hours_id_seq";

-- AlterTable
ALTER TABLE "promotion_times" DROP CONSTRAINT "promotion_times_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "promotion_times_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "promotion_times_id_seq";
