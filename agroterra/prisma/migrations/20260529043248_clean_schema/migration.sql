-- CreateTable
CREATE TABLE "RoomTab" (
    "id" TEXT NOT NULL,
    "roomTypeId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "eyebrow" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "size" TEXT,
    "beds" TEXT,
    "bath" TEXT,
    "guests" TEXT,
    "videoSrc" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "imageId" TEXT,

    CONSTRAINT "RoomTab_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomTabParagraph" (
    "id" TEXT NOT NULL,
    "tabId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "RoomTabParagraph_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomTab_roomTypeId_key_key" ON "RoomTab"("roomTypeId", "key");

-- AddForeignKey
ALTER TABLE "RoomTab" ADD CONSTRAINT "RoomTab_roomTypeId_fkey" FOREIGN KEY ("roomTypeId") REFERENCES "RoomType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomTab" ADD CONSTRAINT "RoomTab_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "MediaAsset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomTabParagraph" ADD CONSTRAINT "RoomTabParagraph_tabId_fkey" FOREIGN KEY ("tabId") REFERENCES "RoomTab"("id") ON DELETE CASCADE ON UPDATE CASCADE;
