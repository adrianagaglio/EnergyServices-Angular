import { ErrorModalComponent } from './../shared/error/error-modal/error-modal.component';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  let modalService = inject(NgbModal);

  return next(req).pipe(
    catchError((error) => {
      let message = error.error.message;

      if (error.status === 403) {
        message = 'Access denied';
      }

      const modalRef = modalService.open(ErrorModalComponent, { size: 'lg' });
      modalRef.componentInstance.message = message;

      throw new Error(error);
    })
  );
};
