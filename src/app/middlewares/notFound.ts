import { Request, Response, NextFunction } from 'express';

// Not Found Middleware
const notFound = (req: Request, res: Response, next: NextFunction) => {
  if (!res.headersSent) {
    res.status(404).json({
      success: false,
      message: 'Route not found!',
    });
  } else {
    next();
  }
};

export default notFound;
