import ProxyRoute from "./proxyRoute";

export class AuthProxy implements ProxyRoute {
	public path: string = "/auth";
	public target: string = "http://localhost:3001";
}

// export class MailProxy implements ProxyRoute {
// 	public path: string = "/mail";
// 	public target: string = "http://localhost:3002"
// }

export class ProfileProxy implements ProxyRoute {
	public path: string = "/profile";
	public target: string = "http://localhost:3003";
}
