import App from "./app";

//environmental variables
import "dotenv/config";
import validateEnv from "./utils/validation/validateEnv";

//proxyRoutes
import {
	AuthProxy,
	FollowProxy,
	KweetProxy,
	LikeProxy,
	ProfileProxy,
	TrendProxy
} from "./proxyRoutes/proxyRoutes";

const main = async () => {
	const app = new App();

	app.initializeProxyMiddlewares([
		new AuthProxy(),
		new ProfileProxy(),
		new TrendProxy(),
		new KweetProxy(),
		new FollowProxy(),
		new LikeProxy()
	]);

	app.listen();
};

validateEnv();
main();
