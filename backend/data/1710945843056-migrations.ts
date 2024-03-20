import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1710945843056 implements MigrationInterface {
    name = 'Migrations1710945843056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar, "description" varchar, "timestampStart" integer NOT NULL, "timestampEnd" integer, "location" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
