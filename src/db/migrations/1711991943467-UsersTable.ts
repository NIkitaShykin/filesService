import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class UsersTable1711991943467 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'users',
				columns: [
					{
						name: 'id',
						type: 'varchar',
						isPrimary: true,
					},
					{
						name: 'password',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'refreshToken',
						type: 'varchar',
						isNullable: true,
					},
				],
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable('users')
		if (table) await queryRunner.dropTable('users')
	}
}
