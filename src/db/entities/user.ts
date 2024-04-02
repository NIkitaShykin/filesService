import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User {
	@PrimaryColumn({ primary: true })
	id!: string

	@Column({ nullable: false })
	password!: string

	@Column({ nullable: true })
	refreshToken?: string
}
