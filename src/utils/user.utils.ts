export interface IUserDto {
	id: string
	password: string
}
export function isUserDto(value: unknown): value is IUserDto {
	if (
		typeof value === 'object' &&
		value !== null &&
		!Array.isArray(value) &&
		'id' in value &&
		'password' in value
	) {
		return true
	} else {
		return false
	}
}
