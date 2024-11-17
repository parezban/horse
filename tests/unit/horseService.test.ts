import HorseService from '../../src/services/horseService';
import HorseRepository from '../../src/repositories/horseRepository';
import OwnerRepository from '../../src/repositories/ownerRepository';
import OwnerNotFoundError from '../../src/errors/ownerNotFoundError';
import HorseNotFoundError from '../../src/errors/horseNotFoundError';
import Horse from '../../src/models/horse';

jest.mock('../../src/repositories/horseRepository');
jest.mock('../../src/repositories/ownerRepository');

describe('HorseService', () => {
    const createHorseData = {
        name: 'Thunder',
        age: 5,
        breed: 'Arabian',
        healthStatus: 'Healthy',
        owner: 'owner123',
    };

    const updateHorseData = {
        name: 'Thunder',
        age: 6,
        breed: 'Arabian',
        healthStatus: 'Recovering',
        owner: 'owner123',
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a horse successfully', async () => {
        const newHorse = createHorseData;
        const owner = { id: 'owner123', name: 'Owner Name' };

        (OwnerRepository.getOwnerById as jest.Mock).mockResolvedValue(owner);
        (HorseRepository.createHorse as jest.Mock).mockResolvedValue(newHorse);

        const result = await HorseService.createHorse(newHorse as Horse);

        expect(result).toEqual(newHorse);
        expect(OwnerRepository.getOwnerById).toHaveBeenCalledWith(newHorse.owner);
        expect(HorseRepository.createHorse).toHaveBeenCalledWith(newHorse);
    });

    it('should throw OwnerNotFoundError if owner does not exist', async () => {
        const newHorse = createHorseData;

        (OwnerRepository.getOwnerById as jest.Mock).mockResolvedValue(null);

        await expect(HorseService.createHorse(newHorse as Horse)).rejects.toThrow(OwnerNotFoundError);
        expect(OwnerRepository.getOwnerById).toHaveBeenCalledWith(newHorse.owner);
        expect(HorseRepository.createHorse).not.toHaveBeenCalled();
    });

    it('should update horse successfully', async () => {
        const updatedHorse = updateHorseData;
        const existingHorse = { id: 'horse123', ...createHorseData };
        const owner = { id: 'owner123', name: 'Owner Name' };

        (HorseRepository.getHorseById as jest.Mock).mockResolvedValue(existingHorse);
        (OwnerRepository.getOwnerById as jest.Mock).mockResolvedValue(owner);
        (HorseRepository.updateHorse as jest.Mock).mockResolvedValue(updatedHorse);

        const result = await HorseService.updateHorse('horse123', updatedHorse as Horse);

        expect(result).toEqual(updatedHorse);
        expect(HorseRepository.getHorseById).toHaveBeenCalledWith('horse123');
        expect(HorseRepository.updateHorse).toHaveBeenCalledWith('horse123', updatedHorse);
    });

    it('should throw HorseNotFoundError if horse does not exist', async () => {
        const updatedHorse = updateHorseData;

        (HorseRepository.getHorseById as jest.Mock).mockResolvedValue(null);

        await expect(HorseService.updateHorse('horse123', updatedHorse as Horse)).rejects.toThrow(HorseNotFoundError);
        expect(HorseRepository.getHorseById).toHaveBeenCalledWith('horse123');
        expect(HorseRepository.updateHorse).not.toHaveBeenCalled();
    });

    it('should delete a horse successfully', async () => {
        const horseId = 'horse123';

        (HorseRepository.getHorseById as jest.Mock).mockResolvedValue({ id: horseId });
        (HorseRepository.deleteHorse as jest.Mock).mockResolvedValue({});

        await HorseService.deleteHorse(horseId);

        expect(HorseRepository.getHorseById).toHaveBeenCalledWith(horseId);
        expect(HorseRepository.deleteHorse).toHaveBeenCalledWith(horseId);
    });

    it('should throw HorseNotFoundError when deleting a non-existing horse', async () => {
        const horseId = 'horse123';

        (HorseRepository.getHorseById as jest.Mock).mockResolvedValue(null);

        await expect(HorseService.deleteHorse(horseId)).rejects.toThrow(HorseNotFoundError);
        expect(HorseRepository.getHorseById).toHaveBeenCalledWith(horseId);
        expect(HorseRepository.deleteHorse).not.toHaveBeenCalled();
    });
});
