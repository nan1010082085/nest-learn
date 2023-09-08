import { MigrationInterface, QueryRunner } from "typeorm";

export class ENTITY1694139773385 implements MigrationInterface {
    name = 'ENTITY1694139773385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`menu\` DROP COLUMN \`acl\``);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD \`order\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD \`acl\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`updateDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`log\` ADD \`createDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`log\` ADD \`updateDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`log\` DROP COLUMN \`updateDate\``);
        await queryRunner.query(`ALTER TABLE \`log\` DROP COLUMN \`createDate\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`updateDate\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`createDate\``);
        await queryRunner.query(`ALTER TABLE \`menu\` DROP COLUMN \`acl\``);
        await queryRunner.query(`ALTER TABLE \`menu\` DROP COLUMN \`order\``);
        await queryRunner.query(`ALTER TABLE \`menu\` ADD \`acl\` varchar(255) NOT NULL`);
    }

}
