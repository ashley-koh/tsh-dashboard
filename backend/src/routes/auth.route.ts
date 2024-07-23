import { Router } from 'express';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users';
import { Routes } from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { AuthLoginDto } from '@dtos/auth';

class AuthRoute implements Routes {
  public path = '/';

  public router = Router();

  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}signup`,
      validationMiddleware(CreateUserDto, 'body'),
      this.authController.signUp,
    );
    this.router.post(
      `${this.path}login`,
      validationMiddleware(AuthLoginDto, 'body'),
      this.authController.logIn,
    );
    this.router.get(
      `${this.path}verify`,
      authMiddleware,
      this.authController.verify,
    );
    this.router.post(
      `${this.path}logout`,
      authMiddleware,
      this.authController.logOut,
    );
  }
}

export default AuthRoute;
