export interface User {
    id: number;
    name: string;
    institution: Institution;
}

export enum Institution {
    cardio,
    surgery,
}

export interface Doctor extends User {
    isHeadOfInstitution: boolean;
}

export interface Nurse extends User {}
