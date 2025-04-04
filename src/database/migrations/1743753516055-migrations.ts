import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1743753516055 implements MigrationInterface {
  name = 'Migrations1743753516055';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`role\` enum ('student', 'teacher') NOT NULL DEFAULT 'student', \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP(), \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`scheduling\` (\`id\` int NOT NULL AUTO_INCREMENT, \`datetime\` datetime NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'PENDING', \`duration_in_minutes\` int NOT NULL DEFAULT '60', \`student_id\` int NULL, \`teacher_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`scheduling\` ADD CONSTRAINT \`FK_40fef85b2be04d64c0f96229e81\` FOREIGN KEY (\`student_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`scheduling\` ADD CONSTRAINT \`FK_aa22a8f4c332b544d5566ab05b8\` FOREIGN KEY (\`teacher_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`scheduling\` DROP FOREIGN KEY \`FK_aa22a8f4c332b544d5566ab05b8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`scheduling\` DROP FOREIGN KEY \`FK_40fef85b2be04d64c0f96229e81\``,
    );
    await queryRunner.query(`DROP TABLE \`scheduling\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
