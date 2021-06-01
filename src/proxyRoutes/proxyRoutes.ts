import ProxyRoute from "./proxyRoute";

export class AuthProxy implements ProxyRoute {
	public path: string = "/auth";
	public target: string = process.env.AUTH_SERVICE_HOST
		? process.env.AUTH_SERVICE_HOST
		: "http://localhost:3001";
}

export class ProfileProxy implements ProxyRoute {
	public path: string = "/profile";
	public target: string = process.env.PROFILE_SERVICE_HOST
		? process.env.PROFILE_SERVICE_HOST
		: "http://localhost:3003";
}

export class TrendProxy implements ProxyRoute {
	public path: string = "/trend";
	public target: string = process.env.TREND_SERVICE_HOST
		? process.env.TREND_SERVICE_HOST
		: "http://localhost:3004";
}

export class KweetProxy implements ProxyRoute {
	public path: string = "/kweet";
	public target: string = process.env.KWEET_SERVICE_HOST
		? process.env.KWEET_SERVICE_HOST
		: "http://localhost:3005";
}

export class FollowProxy implements ProxyRoute {
	public path: string = "/follow";
	public target: string = process.env.FOLLOW_SERVICE_HOST
		? process.env.FOLLOW_SERVICE_HOST
		: "http://localhost:3006";
}

export class LikeProxy implements ProxyRoute {
	public path: string = "/like";
	public target: string = process.env.LIKE_SERVICE_HOST
		? process.env.LIKE_SERVICE_HOST
		: "http://localhost:3007";
}
