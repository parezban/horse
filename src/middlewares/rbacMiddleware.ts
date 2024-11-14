import { Request, Response, NextFunction } from 'express';

export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.headers['x-user-role'];
    if (userRole && roles.includes(userRole as string)) {
      next();
    } else {
      res.status(403).json({ message: 'Access Denied' });
    }
  };
};
