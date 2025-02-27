import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptorsService: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    withCredentials: true // Enables sending cookies
  });

  return next(modifiedReq);
};