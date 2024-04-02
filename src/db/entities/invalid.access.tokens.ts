import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'invalidAccessTokens' })
export class InvalidAccessToken {
	@PrimaryGeneratedColumn('increment')
	id!: number

	@Column({ nullable: false })
	accessToken!: string
}
