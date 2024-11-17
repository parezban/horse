import request from 'supertest';
import app from '../../src/app';
import OwnerRepository from '../../src/repositories/ownerRepository';

jest.mock('../../src/repositories/ownerRepository');

describe('Owner Controller', () => {
    const createOwnerData = {
        name: 'John Doe',
        email: 'johndoe@example.com'
    };

    const updateOwnerData = {
        name: 'John Doe Updated',
        email: 'johndoeupdated@example.com'
    };

    it('should create an owner successfully', async () => {
        const newOwner = createOwnerData;
        (OwnerRepository.createOwner as jest.Mock).mockResolvedValue(newOwner);

        const response = await request(app)
            .post('/api/v1/owners')
            .set('x-user-role', 'admin')
            .send(newOwner)
            .expect(201);

        expect(response.body).toEqual(newOwner);
        expect(OwnerRepository.createOwner).toHaveBeenCalledWith(newOwner);
    });

    it('should return all owners', async () => {
        const ownersList = [createOwnerData];
        (OwnerRepository.getOwners as jest.Mock).mockResolvedValue(ownersList);

        const response = await request(app)
            .get('/api/v1/owners')
            .set('x-user-role', 'admin')
            .expect(200);

        expect(response.body).toEqual(ownersList);
        expect(OwnerRepository.getOwners).toHaveBeenCalled();
    });

    it('should get an owner by ID', async () => {
        const owner = createOwnerData;
        (OwnerRepository.getOwnerById as jest.Mock).mockResolvedValue(owner);

        const response = await request(app)
            .get('/api/v1/owners/1')
            .set('x-user-role', 'admin')
            .expect(200);

        expect(response.body).toEqual(owner);
        expect(OwnerRepository.getOwnerById).toHaveBeenCalledWith('1');
    });

    it('should update an owner successfully', async () => {
        const updatedOwner = updateOwnerData;
        (OwnerRepository.updateOwner as jest.Mock).mockResolvedValue(updatedOwner);

        const response = await request(app)
            .put('/api/v1/owners/1')
            .set('x-user-role', 'admin')
            .send(updatedOwner)
            .expect(200);

        expect(response.body).toEqual(updatedOwner);
        expect(OwnerRepository.updateOwner).toHaveBeenCalledWith('1', updatedOwner);
    });

    it('should delete an owner successfully', async () => {
        (OwnerRepository.deleteOwner as jest.Mock).mockResolvedValue(true);

        const response = await request(app)
            .delete('/api/v1/owners/1')
            .set('x-user-role', 'admin')
            .expect(204);

        expect(OwnerRepository.deleteOwner).toHaveBeenCalledWith('1');
        expect(response.body).toEqual({});
    });

    it('should allow admin to access owner data', async () => {
        const response = await request(app)
            .get('/api/v1/owners')
            .set('x-user-role', 'admin')
            .expect(200);

        expect(response.status).toBe(200);
    });

    it('should not allow non-admin to access owner data', async () => {
        const response = await request(app)
            .get('/api/v1/owners')
            .expect(403);

        expect(response.status).toBe(403);
    });

    it('should not allow vet to create owner', async () => {
        const response = await request(app)
            .post('/api/v1/owners')
            .set('x-user-role', 'vet')
            .expect(403);

        expect(response.status).toBe(403);
    });
});
