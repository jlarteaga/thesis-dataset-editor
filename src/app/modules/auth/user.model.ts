export class User {

	get token() {
		if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
			return null;
		}
		return this._token;
	}

	constructor(
		public email: string,
		public uuid: string,
		private _token: string,
		private _tokenExpirationDate: Date
	) {
	}

}