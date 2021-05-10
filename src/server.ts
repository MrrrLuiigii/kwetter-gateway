import App from "./app";

//environmental variables
import "dotenv/config";
import validateEnv from "./utils/validation/validateEnv";

//controllers
// import GatewayController from "./controllers/gatewayController";

//proxyRoutes
import {
	AuthProxy,
	FollowProxy,
	KweetProxy,
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
		new FollowProxy()
	]);
	// app.initializeMiddlewares();
	// app.initializeControllers([new GatewayController()]);
	app.listen();
};

validateEnv();
main();
