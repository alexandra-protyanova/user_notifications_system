import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const TABLE_NAME = 'users';

export class CreateUsersTable1720275859478 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      await queryRunner.createTable(
        new Table({
          name: TABLE_NAME,
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
            },
          ],
        }),
        true,
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);

      await queryRunner.rollbackTransaction();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();

    try {
      await queryRunner.dropTable(TABLE_NAME);
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);

      await queryRunner.rollbackTransaction();
    }
  }
}
