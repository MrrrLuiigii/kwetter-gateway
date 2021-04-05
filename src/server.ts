import App from "./app";

//environmental variables
import "dotenv/config";
import validateEnv from "./utils/validation/validateEnv";

//controllers
import GatewayController from "./controllers/gatewayController";

//proxyRoutes
import { AuthProxy, ProfileProxy } from "./proxyRoutes/proxyRoutes";

const main = async () => {
	const app = new App();

	app.initializeProxyMiddlewares([new AuthProxy(), new ProfileProxy()]);
	app.initializeControllers([new GatewayController()]);
	app.initializeMiddlewares();
	app.listen();
};

validateEnv();
main();
