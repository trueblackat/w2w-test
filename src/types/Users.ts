export interface User {
    id: string;
    name: string;
    institution: Institution;
    post: Post;
}

export type Institution = "cardio" | "surgery";

export type Post = "doctor" | "nurse";

export interface Doctor extends User {
    isHeadOfInstitution: boolean;
    post: "doctor";
}

export interface Nurse extends User {
    post: "nurse";
}
