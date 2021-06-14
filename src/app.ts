import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Controller from "./controllers/controller";
import { createProxyMiddleware } from "http-proxy-middleware";
import ProxyRoute from "./proxyRoutes/proxyRoute";
import { authenticate } from "./utils/authenticationMiddleware";

class App {
	private app: Application;

	private frontendHost: string = process.env.FRONTEND_HOST!;

	constructor() {
		this.app = express();
		this.allowCors();
	}

	public initializeControllers(controllers: Controller[]) {
		controllers.forEach((c) => {
			this.app.use(c.path, c.router);
		});
	}

	public initializeMiddlewares() {
		this.app.use(express.json());
		this.app.use(cookieParser());
	}

	private allowCors() {
		const allowedOrigins: string[] = [this.frontendHost];
		this.app.use(
			cors({
				origin: (origin, callback) => {
					if (allowedOrigins.indexOf(origin!) !== -1) {
						return callback(null, true);
					}
					// return callback(new Error("Not allowed by CORS"), false);
					return callback(null, true);
				}
			})
		);
	}

	//TODO: async await bug
	public initializeProxyMiddlewares(proxyRoutes: ProxyRoute[]) {
		proxyRoutes.forEach(async (p) => {
			this.app.use(
				p.path,
				createProxyMiddleware({
					target: p.target,
					changeOrigin: true
					// onProxyReq: await authenticate
				})
			);
		});
	}

	public listen() {
		const port: number = Number(
			process.env.PORT || process.env.PORT_GATEWAY || 3000
		);
		this.app.listen(port, () => {
			console.log(`Server is listening on port ${port}...`);
		});
	}
}

export default App;
