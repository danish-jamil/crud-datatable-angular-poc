import { HttpHeaders } from '@angular/common/http';
export const Constant = {
	asiWindow: window['asi'],
	asi: {
		smartLinkUrl: window['asi'].smartLinkUrl,
		guid: window['asi'].app._guid,
		companyId: window['asi'].app._comp_id,
    userId: window['asi'].app._sso_id,
		isCorp: window['asi'].app._isCorp,
    appId: window['asi'].app._id,
		AuthHeaders: new HttpHeaders().set('Authorization', 'AsiMemberAuth guid="' + window['asi'].app._guid + '"')
	},
	httpErrorResponses: {
		400: 'Your input is not valid',
		401: 'You are not authorized',
		402: 'Payment is required',
		403: 'You are forbidden',
		404: 'Your request is not found',
		405: 'Method not allowed',
		406: 'Server response is not acceptable',
		415: 'UnSupported Media Type'
	},
	ToastrOptions: {
		easeTime: 300,
		timeOut: 3000,
		positionClass: 'toast-top-right',
		tapToDismiss: false,
		closeButton: false
	}
};

export enum MenuActions {
	Create = 'Create',
	Copy = 'Copy',
	Delete = 'Delete',
	Edit = 'Edit',
	BulkDelete = 'BulkDelete'
}

export enum KeyCodes {
	Enter = 'Enter',
	Escape = 'Escape',
	KeyY = 'KeyY',
	KeyN = 'KeyN'
}
