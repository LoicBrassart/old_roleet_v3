import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1711126716688 implements MigrationInterface {
    name = 'Migrations1711126716688'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "scenario_npcs_character" ("scenarioId" integer NOT NULL, "characterId" integer NOT NULL, PRIMARY KEY ("scenarioId", "characterId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dcde8f101b1fe789cf93713bca" ON "scenario_npcs_character" ("scenarioId") `);
        await queryRunner.query(`CREATE INDEX "IDX_61801e51aace868cc0bd79bbca" ON "scenario_npcs_character" ("characterId") `);
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
        await queryRunner.query(`DROP INDEX "IDX_61801e51aace868cc0bd79bbca"`);
        await queryRunner.query(`DROP INDEX "IDX_dcde8f101b1fe789cf93713bca"`);
        await queryRunner.query(`DROP TABLE "scenario_npcs_character"`);
    }

}
