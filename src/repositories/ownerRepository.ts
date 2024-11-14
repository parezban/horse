import Owner from '../models/owner';
import firestore from '../firestore';
import { getErrorMessage } from './helper';
import logger from '../logger';

const ownersCollection = firestore.collection('owners');

export class OwnerRepository {
    static async createOwner(ownerData: Owner): Promise<Owner> {
        try {
            const docRef = await ownersCollection.add(ownerData);
            return { id: docRef.id, ...ownerData };
        } catch (error) {
            logger.error(`Error creating owner: ${getErrorMessage(error)}`);
            throw error;
        }
    }

    static async getOwnerById(id: string): Promise<Owner | null> {
        try {
            const doc = await ownersCollection.doc(id).get();
            if (!doc.exists) return null;
            return { id: doc.id, ...doc.data() } as Owner;
        } catch (error) {
            logger.error(`Error getting owner by id ${id}: ${getErrorMessage(error)}`);
            throw error;
        }
    }

    static async getOwners(): Promise<Owner[]> {
        try {
            const snapshot = await ownersCollection.get();
            return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Owner));
        } catch (error) {
            logger.error(`Error getting owners: ${getErrorMessage(error)}`);
            throw error;
        }
    }

    static async updateOwner(id: string, updatedOwnerData: Partial<Owner>): Promise<Owner> {
        try {
            const ownerRef = ownersCollection.doc(id);
            await ownerRef.update(updatedOwnerData);
            const updatedOwner = (await ownerRef.get()).data();
            return { id, ...updatedOwner } as Owner;
        } catch (error) {
            logger.error(`Error updating owner: ${getErrorMessage(error)}`);
            throw error;
        }
    }

    static async deleteOwner(id: string): Promise<void> {
        try {
            await ownersCollection.doc(id).delete();
        } catch (error) {
            logger.error(`Error deleting owner: ${getErrorMessage(error)}`);
            throw error;
        }
    }
}
