import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1710948658290 implements MigrationInterface {
    name = 'Migrations1710948658290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "scenario" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "teaser" varchar NOT NULL, "fullStory" varchar NOT NULL, "bannerUrl" varchar, "credits" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "scenario"`);
    }

}
