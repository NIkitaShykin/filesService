import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class FilesTable1712084924717 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'files',
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
						isNullable: false,
					},
					{
						name: 'MIMEtype',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'size',
						type: 'int',
						isNullable: false,
					},
                    {
                        name: 'path',
                        type: 'varchar',
                        isNullable: false
                    },
					{
						name: 'uploadDate',
						type: 'timestamp',
						default: 'now()',
					},
				],
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable('files')
		if (table) await queryRunner.dropTable('files')
	}
}
