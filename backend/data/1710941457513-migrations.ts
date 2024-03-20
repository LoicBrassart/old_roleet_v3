import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1710941457513 implements MigrationInterface {
    name = 'Migrations1710941457513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "character" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar, "avatarUrl" varchar)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "character"`);
    }

}
