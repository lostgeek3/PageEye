-- CreateTable
CREATE TABLE `User` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `avatar` LONGTEXT NOT NULL,
    `tel` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `available` BOOLEAN NOT NULL DEFAULT true,
    `role` ENUM('Client', 'Admin') NOT NULL DEFAULT 'Client',
    `userSettingId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `loginAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_userSettingId_key`(`userSettingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAuth` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(191) NOT NULL,
    `userId` BIGINT NOT NULL,

    UNIQUE INDEX `UserAuth_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSetting` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `darkMode` BOOLEAN NOT NULL DEFAULT false,
    `language` ENUM('Chinese', 'English') NOT NULL DEFAULT 'Chinese',
    `defaultWatchInterval` ENUM('OneSecond', 'OneMinute', 'OneHour', 'OneDay') NOT NULL DEFAULT 'OneMinute',
    `defaultLogInterval` ENUM('OneMinute', 'OneHour', 'OneDay', 'OneWeek', 'OneMonth') NOT NULL DEFAULT 'OneDay',
    `defaultUrlHeader` VARCHAR(191) NOT NULL DEFAULT 'http://',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Watcher` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `element` TEXT NULL,
    `state` ENUM('Created', 'Active', 'Stopped', 'Paused', 'Failed', 'Completed') NOT NULL DEFAULT 'Created',
    `watchInterval` ENUM('OneSecond', 'OneMinute', 'OneHour', 'OneDay') NOT NULL DEFAULT 'OneMinute',
    `logInterval` ENUM('OneMinute', 'OneHour', 'OneDay', 'OneWeek', 'OneMonth') NOT NULL DEFAULT 'OneDay',
    `available` BOOLEAN NOT NULL DEFAULT true,
    `email` VARCHAR(191) NULL,
    `tel` VARCHAR(191) NULL,
    `useEmailService` BOOLEAN NOT NULL DEFAULT true,
    `useSmsService` BOOLEAN NOT NULL DEFAULT true,
    `userId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WatcherData` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `content` LONGTEXT NOT NULL,
    `watcherId` BIGINT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmailServiceHistory` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `watcherId` BIGINT NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `state` ENUM('Created', 'Sent', 'Failed', 'Timeout') NOT NULL DEFAULT 'Created',
    `sentAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SmsServiceHistory` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `watcherId` BIGINT NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `state` ENUM('Created', 'Sent', 'Failed', 'Timeout') NOT NULL DEFAULT 'Created',
    `sentAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_userSettingId_fkey` FOREIGN KEY (`userSettingId`) REFERENCES `UserSetting`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Watcher` ADD CONSTRAINT `Watcher_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
