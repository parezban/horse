export interface Horse {
    id?: string;
    name: string;
    age: number;
    breed: string;
    healthStatus: 'Healthy' | 'Injured' | 'Recovering' | 'Unknown';
    owner: string;
    createdAt: Date;
}