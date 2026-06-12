-- CreateTable
CREATE TABLE `Quartos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` INTEGER NOT NULL,
    `tipo` VARCHAR(191) NULL,

    UNIQUE INDEX `Quartos_numero_key`(`numero`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hospede` VARCHAR(191) NULL,
    `data_entrada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_saida` DATETIME(3) NULL,
    `quarto_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reservas` ADD CONSTRAINT `Reservas_quarto_id_fkey` FOREIGN KEY (`quarto_id`) REFERENCES `Quartos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
