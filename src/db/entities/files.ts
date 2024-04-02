import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm'

@Entity({ name: 'files' })
export class File {
	@PrimaryGeneratedColumn('increment')
	id!: number

	@Column({ nullable: false })
	name!: string

	@Column({ nullable: false })
	MIMEtype!: string

	@Column({ nullable: false })
	size!: number

	@Column({ nullable: false})
	path!: string

	@CreateDateColumn()
	uploadDate!: number
}
