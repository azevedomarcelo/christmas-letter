import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Letters from '../models/Letters';

export default {
  async create(request: Request, response: Response){
    // Create a new letter
    try {
      const {
        name,
        age,
        message
      } = request.body;

      const lettersRepository = getRepository(Letters);

      const letters = lettersRepository.create({
        name,
        age,
        message,
      });

      await lettersRepository.save(letters);

      return response.status(201).json(letters);
    } catch (err) {
      return response.status(500).json({ error: err.message });
    }
  },

  async read(request: Request, response: Response) {
    // List a specific letter.
    const { id } = request.params;

    try {
      const lettersRepository = getRepository(Letters);

      const letter = await lettersRepository.findOne(id);

      return response.status(200).json(letter);
    } catch (err) {
      return response.status(404).json({ error: 'Letter not found!' });
    }
  },

  async update(request: Request, response: Response) {
    // Update a specific letter.
    const {
      name,
      age,
      message
    } = request.body;

    const { id } = request.params;

    try {
      const lettersRepository = getRepository(Letters);

      const letterUpdated = await lettersRepository.update(id, {
        name, age, message
      });

      return response.status(200).json(letterUpdated);
    } catch (err) {
      return response.status(404).json({ error: 'Letter not found!' });
    }

  },

  async delete(request: Request, response: Response) {
    // Delete a letter.
    const { id } = request.params;

    try {
      const lettersRepository = getRepository(Letters);

      const letter = await lettersRepository.delete(id);

      return response.status(204).json({ message: 'Letter deleted'});
    } catch(err) {
      return response.status(400).json({ error: 'Bad request' });
    }
  },

  async index(request: Request, response: Response) {
    // List all letters.
    try {
      const lettersRepository = getRepository(Letters);

      const letters = await lettersRepository.find();

      return response.status(201).json(letters);
    } catch (err) {
      return response.status(404).json({ error: 'Letters not found' });
    }
  },
}
