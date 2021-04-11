export default class HttpRequestHelper {
		
	public static ObjectToQueryParams(o: any) : string {
		let params:string = "";
		const keys = Object.keys(o);
		for (const [i, key] of keys.entries()) {
			if(typeof o[key] === 'string' || typeof o[key] === 'number' || typeof o[key] === 'boolean') {
				params += `${key.toLocaleLowerCase()}=${o[key]}`;

				if(i < keys.length - 1) {
						params += '&';
				}
			}
		}
		return params;
	}
}
