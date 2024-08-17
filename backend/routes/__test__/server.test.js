const request = require('supertest');
const app = require('../../server');

describe('code snippet', () => {

    // loginUser with valid email and password returns a token
    const User = require('../models/userModel');
    const jwt = require('jsonwebtoken');
    const { loginUser } = require('./userController');

    jest.mock('../models/userModel');
    jest.mock('jsonwebtoken');

    describe('code snippet', () => {
      it('should return a token when valid email and password are provided', async () => {
        const req = {
          body: {
            email: 'test@example.com',
            password: 'password123'
          }
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };

        const user = {
          _id: '123',
          role: 'user',
          email: 'test@example.com'
        };
        const token = 'token123';

        User.login.mockResolvedValue(user);
        jwt.sign.mockReturnValue(token);

        await loginUser(req, res);

        expect(User.login).toHaveBeenCalledWith('test@example.com', 'password123');
        expect(jwt.sign).toHaveBeenCalledWith({ _id: '123', role: 'user', email: 'test@example.com' }, process.env.SECRET, { expiresIn: '3d' });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ email: 'test@example.com', token: 'token123' });
      });
    });

    // loginUser with invalid email returns an error message
    const User = require('../models/userModel');
    const { loginUser } = require('./userController');

    jest.mock('../models/userModel');

    describe('code snippet', () => {
      it('should return an error message when invalid email is provided', async () => {
        const req = {
          body: {
            email: 'invalid',
            password: 'password123'
          }
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };

        User.login.mockRejectedValue(new Error('Invalid email'));

        await loginUser(req, res);

        expect(User.login).toHaveBeenCalledWith('invalid', 'password123');
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Invalid email' });
      });
    });

    // getAllUsers returns all users
    const User = require('../models/userModel');
    const { getAllUsers } = require('./userController');

    jest.mock('../models/userModel');

    describe('code snippet', () => {
      it('should return all users', async () => {
        const req = {};
        const res = {
          json: jest.fn()
        };

        const users = [
          { _id: '1', email: 'user1@example.com' },
          { _id: '2', email: 'user2@example.com' }
        ];

        User.find.mockResolvedValue(users);

        await getAllUsers(req, res);

        expect(User.find).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith(users);
      });
    });

    // getUserById returns the user with the specified ID
    const User = require('../models/userModel');
    const { getUserById } = require('./userController');

    jest.mock('../models/userModel');

    describe('code snippet', () => {
      it('should return the user with the specified ID', async () => {
        const req = {
          params: {
            id: '123'
          }
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis()
        };

        const user = { _id: '123', email: 'test@example.com' };

        User.findById.mockResolvedValue(user);

        await getUserById(req, res);

        expect(User.findById).toHaveBeenCalledWith('123');
        expect(res.json).toHaveBeenCalledWith(user);
      });
    });

    // updateUser updates the user with the specified ID
    const User = require('../models/userModel');
    const { updateUser } = require('./userController');

    jest.mock('../models/userModel');

    describe('code snippet', () => {
      it('should update the user with the specified ID', async () => {
        const req = {
          params: {
            id: '123'
          },
          body: {
            email: 'updated@example.com'
          }
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis()
        };

        const updatedUser = { _id: '123', email: 'updated@example.com' };

        User.findByIdAndUpdate.mockResolvedValue(updatedUser);

        await updateUser(req, res);

        expect(User.findByIdAndUpdate).toHaveBeenCalledWith('123', { email: 'updated@example.com' }, { new: true });
        expect(res.json).toHaveBeenCalledWith(updatedUser);
      });
    });

    // deleteUser deletes the user with the specified ID
    const User = require('../models/userModel');
    const { deleteUser } = require('./userController');

    jest.mock('../models/userModel');

    describe('code snippet', () => {
      it('should delete the user with the specified ID', async () => {
        const req = {
          params: {
            id: '123'
          }
        };
        const res = {
          json: jest.fn(),
          status: jest.fn().mockReturnThis()
        };

        const deletedUser = { _id: '123', email: 'test@example.com' };

        User.findByIdAndDelete.mockResolvedValue(deletedUser);

        await deleteUser(req, res);

        expect(User.findByIdAndDelete).toHaveBeenCalledWith('123');
        expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
      });
    });

    // getAllFaculties returns all users with role attribute as 'Faculty'
    const User = require('../models/userModel');
    const { getAllFaculties } = require('./userController');

    jest.mock('../models/userModel');

    describe('code snippet', () => {
      it('should return all users with role attribute as \'Faculty\'', async () => {
        const req = {};
        const res = {
          json: jest.fn()
        };

        const faculties = [
          { _id: '1', email: 'faculty1@example.com', role: 'Faculty' },
          { _id: '2', email: 'faculty2@example.com', role: 'Faculty' }
        ];

        User.find.mockResolvedValue(faculties);

        await getAllFaculties(req, res);

        expect(User.find).toHaveBeenCalledWith({ role: 'Faculty' });
        expect(res.json).toHaveBeenCalledWith(faculties);
      });
    });
});
