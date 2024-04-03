export interface IUserDto {
	id: string
	password: string
}
export function isUserDto(value: unknown): value is IUserDto {
	return (
		typeof value === 'object' &&
		value !== null &&
		!Array.isArray(value) &&
		'id' in value &&
		'password' in value
	)
}
