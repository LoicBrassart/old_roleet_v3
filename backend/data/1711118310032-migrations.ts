import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1711118310032 implements MigrationInterface {
    name = 'Migrations1711118310032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "character" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar, "avatarUrl" varchar)`);
        await queryRunner.query(`CREATE TABLE "scenario" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "teaser" varchar NOT NULL, "fullStory" varchar NOT NULL, "bannerUrl" varchar, "credits" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "event" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar, "description" varchar, "timestampStart" integer NOT NULL, "timestampEnd" integer, "location" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "scenario"`);
        await queryRunner.query(`DROP TABLE "character"`);
    }

}
