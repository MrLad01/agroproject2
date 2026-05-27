/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `HeroSlide` table. All the data in the column will be lost.
  - You are about to drop the column `publicId` on the `HeroSlide` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `SectionOne` table. All the data in the column will be lost.
  - You are about to drop the column `imageLeft` on the `SectionOne` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `SectionOne` table. All the data in the column will be lost.
  - You are about to drop the column `publicId` on the `SectionOne` table. All the data in the column will be lost.
  - You are about to drop the column `subheading` on the `SectionOne` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `SectionTwo` table. All the data in the column will be lost.
  - You are about to drop the column `imageLeft` on the `SectionTwo` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `SectionTwo` table. All the data in the column will be lost.
  - You are about to drop the column `publicId` on the `SectionTwo` table. All the data in the column will be lost.
  - Added the required column `assetId` to the `HeroSlide` table without a default value. This is not possible if the table is not empty.
  - Made the column `subheading` on table `SectionTwo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "HeroSlide" DROP COLUMN "imageUrl",
DROP COLUMN "publicId",
ADD COLUMN     "assetId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SectionOne" DROP COLUMN "body",
DROP COLUMN "imageLeft",
DROP COLUMN "imageUrl",
DROP COLUMN "publicId",
DROP COLUMN "subheading",
ADD COLUMN     "label" TEXT NOT NULL DEFAULT 'Agroterra Resort',
ADD COLUMN     "quote" TEXT NOT NULL DEFAULT 'A place that celebrates life.',
ALTER COLUMN "heading" SET DEFAULT 'WELCOME TO AGROTERRA';

-- AlterTable
ALTER TABLE "SectionTwo" DROP COLUMN "body",
DROP COLUMN "imageLeft",
DROP COLUMN "imageUrl",
DROP COLUMN "publicId",
ADD COLUMN     "expHeading" TEXT NOT NULL DEFAULT 'Harmony With Nature',
ADD COLUMN     "expLabel" TEXT NOT NULL DEFAULT 'Experiences',
ADD COLUMN     "label" TEXT NOT NULL DEFAULT 'Explore',
ALTER COLUMN "heading" SET DEFAULT 'A Place That Fits You',
ALTER COLUMN "subheading" SET NOT NULL,
ALTER COLUMN "subheading" SET DEFAULT 'Choose from spacious suites designed...';

-- CreateTable
CREATE TABLE "SectionOneImage" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "sectionId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,

    CONSTRAINT "SectionOneImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HeroSlide" ADD CONSTRAINT "HeroSlide_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "MediaAsset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionOneImage" ADD CONSTRAINT "SectionOneImage_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "SectionOne"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionOneImage" ADD CONSTRAINT "SectionOneImage_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "MediaAsset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
