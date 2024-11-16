import HorseNotFoundError from '../errors/horseNotFoundError';
import OwnerNotFoundError from '../errors/ownerNotFoundError';
import Horse from '../models/horse';
import HorseRepository from '../repositories/horseRepository';
import OwnerRepository from '../repositories/ownerRepository';

export default class HorseService {
    static async createHorse(horseData: Horse): Promise<Horse> {
        const owner = await OwnerRepository.getOwnerById(horseData.owner);

        if (!owner) {
            throw new OwnerNotFoundError('Owner not found');
        }

        return await HorseRepository.createHorse(horseData);
    }

    static async getHorseByID(id: string): Promise<Horse | null> {
        return await HorseRepository.getHorseById(id);
    }

    static async getHorses(filters: { age?: number; breed?: string; healthStatus?: string }): Promise<Horse[]> {
        return await HorseRepository.getHorses(filters);
    }

    static async deleteHorse(id: string) {
        if (!(await HorseRepository.getHorseById(id))) {
            throw new HorseNotFoundError('Horse not found');
        }

        await HorseRepository.deleteHorse(id);
    }

    static async updateHorse(id: string, updatedHorseData: Partial<Horse>): Promise<Horse> {
        if (!(await HorseRepository.getHorseById(id))) {
            throw new HorseNotFoundError('Horse not found');
        }

        if (updatedHorseData.owner) {
            const owner = await OwnerRepository.getOwnerById(updatedHorseData.owner);

            if (!owner) {
                throw new OwnerNotFoundError('Owner not found');
            }
        }
        
        return await HorseRepository.updateHorse(id, updatedHorseData);
    }
}