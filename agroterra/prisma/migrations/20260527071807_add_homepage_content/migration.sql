-- CreateTable
CREATE TABLE "HeroSlide" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HeroSlide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeroText" (
    "id" TEXT NOT NULL,
    "heading" TEXT NOT NULL DEFAULT 'WELCOME TO AGROTERRA',
    "subtext" TEXT NOT NULL DEFAULT 'A place that celebrates life.',

    CONSTRAINT "HeroText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionOne" (
    "id" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "subheading" TEXT,
    "body" TEXT NOT NULL,
    "imageUrl" TEXT,
    "publicId" TEXT,
    "imageLeft" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SectionOne_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionTwo" (
    "id" TEXT NOT NULL,
    "heading" TEXT NOT NULL,
    "subheading" TEXT,
    "body" TEXT NOT NULL,
    "imageUrl" TEXT,
    "publicId" TEXT,
    "imageLeft" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SectionTwo_pkey" PRIMARY KEY ("id")
);
