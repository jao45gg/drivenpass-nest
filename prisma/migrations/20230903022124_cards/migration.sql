-- CreateTable
CREATE TABLE "cards" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cardNumber" INTEGER NOT NULL,
    "cardName" TEXT NOT NULL,
    "cvvNumber" INTEGER NOT NULL,
    "expirationDate" TIMESTAMP(3) NOT NULL,
    "cardPassword" TEXT NOT NULL,
    "virtualCard" BOOLEAN NOT NULL,
    "credit" BOOLEAN NOT NULL,
    "debit" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
