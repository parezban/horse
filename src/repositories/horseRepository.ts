import Horse, { HealthStatus, validHealthStatuses } from '../models/horse';
import firestore from '../firestore';
import logger from '../logger';
import { getErrorMessage } from './helper';

const horsesCollection = firestore.collection('horses');

export default class HorseRepository {
    static async createHorse(horseData: Horse): Promise<Horse> {
        try {
            horseData.createdAt = new Date()
            const docRef = await horsesCollection.add(horseData);

            return { id: docRef.id, ...horseData };
        } catch (error) {
            logger.error(`Error creating horse: ${getErrorMessage(error)}`);
            throw error;
        }
    }

    static async getHorseById(id: string): Promise<Horse | null> {
        try {
            const doc = await horsesCollection.doc(id).get();
            if (!doc.exists) return null;

            return { id: doc.id, ...doc.data() } as Horse;
        } catch (error) {
            logger.error(`Error getting horse by id ${id}: ${getErrorMessage(error)}`);
            throw error;
        }
    }

    static async getHorses(filters: { age?: number; breed?: string; healthStatus?: string }): Promise<Horse[]> {
        try {
            let query: FirebaseFirestore.Query = horsesCollection;
            if (filters.age) query = query.where('age', '==', filters.age);
            if (filters.breed) query = query.where('breed', '==', filters.breed);
            if (filters.healthStatus) query = query.where('healthStatus', '==', filters.healthStatus);

            const snapshot = await query.get();
            
            return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Horse));
        } catch (error) {
            logger.error(`Error getting horses: ${getErrorMessage(error)}`);
            throw error;
        }
    }

    static async updateHorse(id: string, updatedHorseData: Partial<Horse>): Promise<Horse> {
        try {
            const horseRef = horsesCollection.doc(id);
            await horseRef.update(updatedHorseData);
            const updatedHorse = (await horseRef.get()).data();

            return { id, ...updatedHorse } as Horse;
        } catch (error) {
            logger.error(`Error updating horse: ${getErrorMessage(error)}`);
            throw error;
        }
    }

    static async deleteHorse(id: string): Promise<void> {
        try {
            await horsesCollection.doc(id).delete();
        } catch (error) {
            logger.error(`Error deleting horse: ${getErrorMessage(error)}`);
            throw error;
        }
    }

    static async updateHealthStatus(id: string, healthStatus: HealthStatus): Promise<Horse> {
        try {
            if (!validHealthStatuses.includes(healthStatus)) {
                throw new Error('Invalid health status');
            }

            const horseRef = horsesCollection.doc(id);
            await horseRef.update({ healthStatus });
            const updatedHorse = (await horseRef.get()).data();
            return { id, ...updatedHorse } as Horse;
        } catch (error) {
            logger.error(`Error updating health status: ${getErrorMessage(error)}`);
            throw error;
        }
    }
}
