import { ClientRequest } from "http";
import { Request, Response } from "express";

import axios from "axios";

//TODO: exception response does not include message
import UnauthorizedException from "./exceptions/unauthorized.exception";
import BadRequestException from "./exceptions/badRequest.exception";

const AUTH_URL = "http://localhost:3001/auth/validate";

export async function authenticate(
	proxyReq: ClientRequest,
	req: Request,
	res: Response
) {
	//TODO: dont do this for /auth
	console.log(req.path);

	if (!req.headers["authorization"])
		return res
			.status(400)
			.send(new BadRequestException("No authorization headers present..."));

	const authenticated = await axios
		.get(AUTH_URL, {
			headers: { authorization: req.headers["authorization"] }
		})
		.then((response) => (response.status === 200 ? true : false))
		.catch(() => false);

	if (!authenticated) {
		return res.status(401).send(new UnauthorizedException("Invalid token..."));
	}

	return true;
}
