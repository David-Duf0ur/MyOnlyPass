export interface IField {
    name: string;
    value: string;
    required?: boolean;
}

export interface ICredentialFields {
    _id?: string;
    userId: number;
    credentialId: string;
    fieldConfig: IField[];
    created_at: Date | string;
    updated_at: Date | string;
}