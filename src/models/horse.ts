// healthStatus.ts
export const validHealthStatuses = ['Healthy', 'Injured', 'Recovering', 'Unknown'] as const;
export type HealthStatus = typeof validHealthStatuses[number];

export default interface Horse {
    id?: string;
    name: string;
    age: number;
    breed: string;
    healthStatus: HealthStatus;
    owner: string;
    createdAt: Date;
}