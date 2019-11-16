import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { MessageService } from 'primeng/api';

@Injectable()
export class InterceptService implements HttpInterceptor {

	constructor(
		private auth: AuthenticationService,
		private messageService: MessageService) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${this.auth.getToken('user')}`
			}
		});
		return next.handle(request)
			.pipe(
				tap(event => {
					if (event instanceof HttpResponse) {
					}
				}, error => {
					let errorMessage;
					error.error.message ? errorMessage = error.error.message : errorMessage = error.message;
					this.messageService.add({ severity: 'error', summary: error.status + ' -' + error.statusText, detail: errorMessage });
				})
			);
	}
}
