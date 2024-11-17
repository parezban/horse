import request from 'supertest';
import app from '../../src/app';
import HorseRepository from '../../src/repositories/horseRepository';
import HorseNotFoundError from '../../src/errors/horseNotFoundError';
import OwnerNotFoundError from '../../src/errors/ownerNotFoundError';
import OwnerRepository from '../../src/repositories/ownerRepository';

jest.mock('../../src/repositories/horseRepository');
jest.mock('../../src/repositories/ownerRepository');

describe('Horse Controller', () => {
    const mockHorses = [
        { id: '1', name: 'Thunder', age: 5, breed: 'Arabian', healthStatus: 'Healthy', owner: 'Owner123' },
        { id: '2', name: 'Lightning', age: 6, breed: 'Thoroughbred', healthStatus: 'Injured', owner: 'Owner124' },
        { id: '3', name: 'Storm', age: 7, breed: 'Arabian', healthStatus: 'Healthy', owner: 'Owner125' },
      ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should filter horses by breed', async () => {
        (HorseRepository.getHorses as jest.Mock).mockResolvedValue([mockHorses[0], mockHorses[2]]);

        const response = await request(app)
            .get('/api/v1/horses')
            .set('x-user-role', 'admin')
            .query({ breed: 'Arabian' })
            .expect(200);

        expect(response.body).toEqual([mockHorses[0], mockHorses[2]]);
        expect(HorseRepository.getHorses).toHaveBeenCalledWith({ breed: 'Arabian' });
    });

    it('should filter horses by healthStatus', async () => {
        (HorseRepository.getHorses as jest.Mock).mockResolvedValue([mockHorses[0], mockHorses[2]]);

        const response = await request(app)
            .get('/api/v1/horses')
            .set('x-user-role', 'admin')
            .query({ healthStatus: 'Healthy' })
            .expect(200);

        expect(response.body).toEqual([mockHorses[0], mockHorses[2]]);
        expect(HorseRepository.getHorses).toHaveBeenCalledWith({ healthStatus: 'Healthy' });
    });

    it('should filter horses by age', async () => {
        (HorseRepository.getHorses as jest.Mock).mockResolvedValue([mockHorses[0]]);

        const response = await request(app)
            .get('/api/v1/horses')
            .set('x-user-role', 'admin')
            .query({ age: 5 })
            .expect(200);

        expect(response.body).toEqual([mockHorses[0]]);
        expect(HorseRepository.getHorses).toHaveBeenCalledWith({ age: 5 });
    });

    it('should create a horse successfully', async () => {
        const horseData = {
            name: 'Thunder',
            age: 5,
            breed: 'Arabian',
            healthStatus: 'Healthy',
            owner: 'q0xhzeYjKtOwyK05vKVk',
        };

        (OwnerRepository.getOwnerById as jest.Mock).mockResolvedValue({ name: 'John Doe', id: 'q0xhzeYjKtOwyK05vKVk' });
        (HorseRepository.createHorse as jest.Mock).mockResolvedValue(horseData);

        const response = await request(app)
            .post('/api/v1/horses')
            .set('x-user-role', 'admin')
            .send(horseData)
            .expect(201);

        expect(response.body).toEqual(horseData);
        expect(HorseRepository.createHorse).toHaveBeenCalledWith(horseData);
    });

    it('should return validation error when creating a horse with invalid data', async () => {
        const invalidHorseData = {
            name: '',
            age: -1,
        };

        const response = await request(app)
            .post('/api/v1/horses')
            .set('x-user-role', 'admin')
            .send(invalidHorseData)
            .expect(400);

        expect(response.body.message).toBe('Invalid data');
    });

    it('should retrieve a list of horses', async () => {
        const horseData = {
            name: 'Thunder',
            age: 5,
            breed: 'Arabian',
            healthStatus: 'Healthy',
            owner: 'q0xhzeYjKtOwyK05vKVk',
        };

        const horsesList = [horseData, { ...horseData, name: 'Lightning' }];
        (HorseRepository.getHorses as jest.Mock).mockResolvedValue(horsesList);

        const response = await request(app)
            .get('/api/v1/horses')
            .set('x-user-role', 'admin')
            .expect(200);

        expect(response.body).toEqual(horsesList);
        expect(HorseRepository.getHorses).toHaveBeenCalled();
    });

    it('should return 404 if owner is not found', async () => {
        const horseData = {
            name: 'Thunder',
            age: 5,
            breed: 'Arabian',
            healthStatus: 'Healthy',
            owner: 'q0xhzeYjKtOwyK05vKVk',
        };

        (HorseRepository.createHorse as jest.Mock).mockRejectedValue(new OwnerNotFoundError('Owner not found'));

        const response = await request(app)
            .post('/api/v1/horses')
            .set('x-user-role', 'admin')
            .send(horseData)
            .expect(404);

        expect(response.body.message).toBe('Owner not found');
    });

    it('should return error when updating a horse with invalid ID', async () => {
        const horseData = {
            name: 'Thunder',
            age: 5,
            breed: 'Arabian',
            healthStatus: 'Healthy',
            owner: 'q0xhzeYjKtOwyK05vKVk',
        };

        (HorseRepository.updateHorse as jest.Mock).mockRejectedValue(new Error('Horse not found'));

        const response = await request(app)
            .put('/api/v1/horses/999')
            .set('x-user-role', 'admin')
            .send(horseData)
            .expect(404);

        expect(response.body.message).toBe('Horse not found');
    });


    it('should delete a horse successfully', async () => {
        (HorseRepository.deleteHorse as jest.Mock).mockResolvedValue(null);
        (HorseRepository.getHorseById as jest.Mock).mockResolvedValue({ id: 1 });

        const response = await request(app)
            .delete('/api/v1/horses/1')
            .set('x-user-role', 'admin')
            .expect(204);

        expect(HorseRepository.deleteHorse).toHaveBeenCalledWith("1");
    });

    it('should return error when deleting a horse that doesn\'t exist', async () => {
        (HorseRepository.deleteHorse as jest.Mock).mockRejectedValue(new HorseNotFoundError('Horse not found'));

        const response = await request(app)
            .delete('/api/v1/horses/999')
            .set('x-user-role', 'admin')
            .expect(404);

        expect(response.body.message).toBe('Horse not found');
    });

    it('should update a horse health status successfully', async () => {
        const horseData = {
            name: 'Thunder',
            age: 5,
            breed: 'Arabian',
            healthStatus: 'Healthy',
            owner: 'q0xhzeYjKtOwyK05vKVk',
        };
        (HorseRepository.getHorseById as jest.Mock).mockResolvedValue(horseData);

        const updatedHealthStatus = { healthStatus: 'Recovering' };
        const updatedHorseData = { ...horseData, healthStatus: 'Recovering' };

        (HorseRepository.updateHorse as jest.Mock).mockResolvedValue(updatedHorseData);

        const response = await request(app)
            .patch('/api/v1/horses/1/health')
            .set('x-user-role', 'admin')
            .send(updatedHealthStatus)
            .expect(200);

        expect(response.body.healthStatus).toBe('Recovering');
        expect(HorseRepository.updateHorse).toHaveBeenCalledWith("1", updatedHealthStatus);
    });

    it('should return error when updating a horse health status with invalid ID', async () => {
        (HorseRepository.getHorseById as jest.Mock).mockResolvedValue(null);

        const response = await request(app)
            .patch('/api/v1/horses/999/health')
            .set('x-user-role', 'admin')
            .send({ healthStatus: 'Recovering' })
            .expect(404);

        expect(response.body.message).toBe('Horse not found');
    });

    it('should allow admin to access horse data', async () => {
        const response = await request(app)
            .get('/api/v1/horses')
            .set('x-user-role', 'admin')
            .expect(200);

        expect(response.status).toBe(200);
    });

    it('should not allow non-admin to access horse data', async () => {
        const response = await request(app)
            .get('/api/v1/horses')
            .expect(403);

        expect(response.status).toBe(403);
    });

    it('should not allow vet to create horse', async () => {
        const response = await request(app)
            .post('/api/v1/horses')
            .set('x-user-role', 'vet')
            .expect(403);

        expect(response.status).toBe(403);
    });


    it('should allow admin to update health status', async () => {
        const horseData = {
            name: 'Thunder',
            age: 5,
            breed: 'Arabian',
            healthStatus: 'Healthy',
            owner: 'q0xhzeYjKtOwyK05vKVk',
        };
        (HorseRepository.getHorseById as jest.Mock).mockResolvedValue(horseData);

        const updatedHealthStatus = { healthStatus: 'Recovering' };
        const updatedHorseData = { ...horseData, healthStatus: 'Recovering' };

        (HorseRepository.updateHorse as jest.Mock).mockResolvedValue(updatedHorseData);

        const response = await request(app)
            .patch('/api/v1/horses/1/health')
            .set('x-user-role', 'vet')
            .send(updatedHealthStatus)
            .expect(200);

        expect(response.body.healthStatus).toBe('Recovering');
        expect(HorseRepository.updateHorse).toHaveBeenCalledWith("1", updatedHealthStatus);
    });
});
