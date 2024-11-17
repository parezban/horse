import OwnerService from '../../src/services/ownerService';
import OwnerRepository from '../../src/repositories/ownerRepository';
import OwnerNotFoundError from '../../src/errors/ownerNotFoundError';
import Owner from '../../src/models/owner';

jest.mock('../../src/repositories/ownerRepository');

describe('OwnerService', () => {
    const mockOwner = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
    };

    const newOwnerData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new owner successfully', async () => {
        (OwnerRepository.createOwner as jest.Mock).mockResolvedValue(mockOwner);

        const owner = await OwnerService.createOwner(newOwnerData as Owner);

        expect(owner).toEqual(mockOwner);
        expect(OwnerRepository.createOwner).toHaveBeenCalledWith(newOwnerData);
    });

    it('should throw an error if creation fails', async () => {
        (OwnerRepository.createOwner as jest.Mock).mockRejectedValue(new Error('Creation failed'));

        await expect(OwnerService.createOwner(newOwnerData as Owner)).rejects.toThrow('Creation failed');
    });

    it('should update an owner successfully', async () => {
        const updatedOwnerData = { name: 'Updated John Doe' };
        const updatedOwner = { ...mockOwner, ...updatedOwnerData };

        (OwnerRepository.getOwnerById as jest.Mock).mockResolvedValue(mockOwner);
        (OwnerRepository.updateOwner as jest.Mock).mockResolvedValue(updatedOwner);

        const owner = await OwnerService.updateOwner(mockOwner.id, updatedOwnerData);

        expect(owner).toEqual(updatedOwner);
        expect(OwnerRepository.updateOwner).toHaveBeenCalledWith(mockOwner.id, updatedOwnerData);
    });

    it('should throw an error if owner not found during update', async () => {
        const updatedOwnerData = { name: 'Updated John Doe' };

        (OwnerRepository.updateOwner as jest.Mock).mockRejectedValue(new OwnerNotFoundError('Owner not found'));

        await expect(OwnerService.updateOwner(mockOwner.id, updatedOwnerData)).rejects.toThrow(OwnerNotFoundError);
    });

    it('should return an owner by id', async () => {
        (OwnerRepository.getOwnerById as jest.Mock).mockResolvedValue(mockOwner);

        const owner = await OwnerService.getOwnerByID(mockOwner.id);

        expect(owner).toEqual(mockOwner);
        expect(OwnerRepository.getOwnerById).toHaveBeenCalledWith(mockOwner.id);
    });

    it('should throw an error if owner not found', async () => {
        (OwnerRepository.getOwnerById as jest.Mock).mockRejectedValue(new OwnerNotFoundError('Owner not found'));

        await expect(OwnerService.getOwnerByID(mockOwner.id)).rejects.toThrow(OwnerNotFoundError);
    });

    it('should delete an owner successfully', async () => {
        (OwnerRepository.deleteOwner as jest.Mock).mockResolvedValue(true);
        (OwnerRepository.getOwnerById as jest.Mock).mockResolvedValue(mockOwner);

        await OwnerService.deleteOwner(mockOwner.id);

        expect(OwnerRepository.deleteOwner).toHaveBeenCalledWith(mockOwner.id);
    });

    it('should throw an error if owner not found during delete', async () => {
        (OwnerRepository.deleteOwner as jest.Mock).mockRejectedValue(new OwnerNotFoundError('Owner not found'));

        await expect(OwnerService.deleteOwner(mockOwner.id)).rejects.toThrow(OwnerNotFoundError);
    });
});
