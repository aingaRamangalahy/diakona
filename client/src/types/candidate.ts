export interface ICandidate {
    id: string,
    name: string,
    profileImage: string,
    selected: boolean,
    vote: number,
    address?: string,
    gender: string
}