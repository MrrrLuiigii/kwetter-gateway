import express, { Router, Request, Response, NextFunction } from "express";
import Controller from "./controller";

class GatewayController implements Controller {
	public path: string = "/gateway";
	public router: Router = express.Router();

	constructor() {
		this.initializeRoutes();
	}

	public initializeRoutes() {
		this.router.get("/info", this.getInfo);
	}

	private getInfo = async (req: Request, res: Response, next: NextFunction) => {
		return res.status(200).send("SUCCESS");
	};
}

export default GatewayController;
