import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';

import { displayError } from '../actions/error.actions';

@Injectable()
export class ErrorEffects {

	onDisplayError$ = createEffect(() =>
		this.actions$.pipe(
			ofType(displayError),
			tap(({ message }) => {
				Swal.fire({
					titleText: 'Error',
					text: message,
					icon: 'error',
					showConfirmButton: true,
					showCancelButton: false,
					showDenyButton: false
				});
			})
		), { dispatch: false });

	constructor(
		private actions$: Actions
	) {
	}
}