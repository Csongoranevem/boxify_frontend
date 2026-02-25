import { ResolveFn } from '@angular/router';

export const authGuardResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
