import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class InvalidAccessTokens1712055635635 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'invalidAccessTokens',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'accessToken',
						type: 'varchar',
						isNullable: false,
					},
				],
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable('invalidAccessTokens')
		if (table) {
			await queryRunner.dropTable(table)
		}
	}
}
