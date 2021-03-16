import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Controller from "./controllers/controller";
import { createProxyMiddleware } from "http-proxy-middleware";
import ProxyRoute from "./proxyRoutes/proxyRoute";

class App {
	private app: Application;

	private frontendHost: string = process.env.FRONTEND_HOST!;
	private socketHost: string = process.env.SOCKET_HOST!;

	constructor() {
		this.app = express();
	}

	public initializeControllers(controllers: Controller[]) {
		controllers.forEach((c) => {
			this.app.use(c.path, c.router);
		});
	}

	public initializeMiddlewares() {
		const allowedOrigins: string[] = [this.frontendHost, this.socketHost];

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

		this.app.use(express.json());
		this.app.use(cookieParser());
	}

	public initializeProxyMiddlewares(proxyRoutes: ProxyRoute[]) {
		proxyRoutes.forEach((p) => {
			this.app.use(
				p.path,
				createProxyMiddleware({
					target: p.target,
					changeOrigin: true
				})
			);
		});
	}

	public listen() {
		const port: number = Number(process.env.PORT || 3000);
		this.app.listen(port, () => {
			console.log(`Server is listening on port ${port}...`);
		});
	}
}

export default App;
