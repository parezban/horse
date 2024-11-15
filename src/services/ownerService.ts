import Owner from '../models/owner';
import OwnerRepository from '../repositories/ownerRepository';

export default class OwnerService {
    static async createOwner(ownerData: Owner): Promise<Owner> {
        return await OwnerRepository.createOwner(ownerData);
    }

    static async findOwnerByEmail(email: string): Promise<Owner | null> {
        return await OwnerRepository.getOwnerBy({ email });
    }

    static async getOwnerByID(id: string): Promise<Owner | null> {
        return await OwnerRepository.getOwnerById(id);
    }

    static async getOwners(): Promise<Owner[]> {
        return await OwnerRepository.getOwners();
    }

    static async deleteOwner(id: string) {
        await OwnerRepository.deleteOwner(id);
    }

    static async updateOwner(id: string, updatedOwnerData: Partial<Owner>): Promise<Owner> {
        return await OwnerRepository.updateOwner(id, updatedOwnerData);
    }
}