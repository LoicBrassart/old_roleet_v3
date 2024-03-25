import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1711382009331 implements MigrationInterface {
    name = 'Migrations1711382009331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "map" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar, "description" varchar, "pictureUrl" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "point_of_interest" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "code" varchar NOT NULL, "title" varchar, "description" varchar, "mapId" integer)`);
        await queryRunner.query(`CREATE TABLE "event" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar, "description" varchar, "timestampStart" integer NOT NULL, "timestampEnd" integer, "location" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "character" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar, "avatarUrl" varchar)`);
        await queryRunner.query(`CREATE TABLE "scenario" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "teaser" varchar NOT NULL, "fullStory" varchar NOT NULL, "bannerUrl" varchar, "credits" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "scenario_npcs_character" ("scenarioId" integer NOT NULL, "characterId" integer NOT NULL, PRIMARY KEY ("scenarioId", "characterId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dcde8f101b1fe789cf93713bca" ON "scenario_npcs_character" ("scenarioId") `);
        await queryRunner.query(`CREATE INDEX "IDX_61801e51aace868cc0bd79bbca" ON "scenario_npcs_character" ("characterId") `);
        await queryRunner.query(`CREATE TABLE "temporary_point_of_interest" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "code" varchar NOT NULL, "title" varchar, "description" varchar, "mapId" integer, CONSTRAINT "FK_c54400b6f652c20f0503ea54070" FOREIGN KEY ("mapId") REFERENCES "map" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_point_of_interest"("id", "code", "title", "description", "mapId") SELECT "id", "code", "title", "description", "mapId" FROM "point_of_interest"`);
        await queryRunner.query(`DROP TABLE "point_of_interest"`);
        await queryRunner.query(`ALTER TABLE "temporary_point_of_interest" RENAME TO "point_of_interest"`);
        await queryRunner.query(`DROP INDEX "IDX_dcde8f101b1fe789cf93713bca"`);
        await queryRunner.query(`DROP INDEX "IDX_61801e51aace868cc0bd79bbca"`);
        await queryRunner.query(`CREATE TABLE "temporary_scenario_npcs_character" ("scenarioId" integer NOT NULL, "characterId" integer NOT NULL, CONSTRAINT "FK_dcde8f101b1fe789cf93713bca9" FOREIGN KEY ("scenarioId") REFERENCES "scenario" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_61801e51aace868cc0bd79bbca5" FOREIGN KEY ("characterId") REFERENCES "character" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("scenarioId", "characterId"))`);
        await queryRunner.query(`INSERT INTO "temporary_scenario_npcs_character"("scenarioId", "characterId") SELECT "scenarioId", "characterId" FROM "scenario_npcs_character"`);
        await queryRunner.query(`DROP TABLE "scenario_npcs_character"`);
        await queryRunner.query(`ALTER TABLE "temporary_scenario_npcs_character" RENAME TO "scenario_npcs_character"`);
        await queryRunner.query(`CREATE INDEX "IDX_dcde8f101b1fe789cf93713bca" ON "scenario_npcs_character" ("scenarioId") `);
        await queryRunner.query(`CREATE INDEX "IDX_61801e51aace868cc0bd79bbca" ON "scenario_npcs_character" ("characterId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_61801e51aace868cc0bd79bbca"`);
        await queryRunner.query(`DROP INDEX "IDX_dcde8f101b1fe789cf93713bca"`);
        await queryRunner.query(`ALTER TABLE "scenario_npcs_character" RENAME TO "temporary_scenario_npcs_character"`);
        await queryRunner.query(`CREATE TABLE "scenario_npcs_character" ("scenarioId" integer NOT NULL, "characterId" integer NOT NULL, PRIMARY KEY ("scenarioId", "characterId"))`);
        await queryRunner.query(`INSERT INTO "scenario_npcs_character"("scenarioId", "characterId") SELECT "scenarioId", "characterId" FROM "temporary_scenario_npcs_character"`);
        await queryRunner.query(`DROP TABLE "temporary_scenario_npcs_character"`);
        await queryRunner.query(`CREATE INDEX "IDX_61801e51aace868cc0bd79bbca" ON "scenario_npcs_character" ("characterId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dcde8f101b1fe789cf93713bca" ON "scenario_npcs_character" ("scenarioId") `);
        await queryRunner.query(`ALTER TABLE "point_of_interest" RENAME TO "temporary_point_of_interest"`);
        await queryRunner.query(`CREATE TABLE "point_of_interest" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "code" varchar NOT NULL, "title" varchar, "description" varchar, "mapId" integer)`);
        await queryRunner.query(`INSERT INTO "point_of_interest"("id", "code", "title", "description", "mapId") SELECT "id", "code", "title", "description", "mapId" FROM "temporary_point_of_interest"`);
        await queryRunner.query(`DROP TABLE "temporary_point_of_interest"`);
        await queryRunner.query(`DROP INDEX "IDX_61801e51aace868cc0bd79bbca"`);
        await queryRunner.query(`DROP INDEX "IDX_dcde8f101b1fe789cf93713bca"`);
        await queryRunner.query(`DROP TABLE "scenario_npcs_character"`);
        await queryRunner.query(`DROP TABLE "scenario"`);
        await queryRunner.query(`DROP TABLE "character"`);
        await queryRunner.query(`DROP TABLE "event"`);
        await queryRunner.query(`DROP TABLE "point_of_interest"`);
        await queryRunner.query(`DROP TABLE "map"`);
    }

}
