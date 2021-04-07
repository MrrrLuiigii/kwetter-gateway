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
	return;
	if (req.path.startsWith("/auth")) return true;

	if (!req.headers["authorization"]) {
		res
			.status(400)
			// .send(new BadRequestException("No authorization headers present..."));
			.send({ status: 400, message: "No authorization headers present..." });
		return proxyReq.end();
	}

	const { status, decoded } = await axios
		.get(AUTH_URL, {
			headers: { authorization: req.headers["authorization"] }
		})
		.then((response) =>
			response.status === 200
				? { status: response.data.status, decoded: response.data.decoded }
				: { status: false, decoded: undefined }
		)
		.catch(() => ({ status: false, decoded: undefined }));

	if (!status) {
		// return res.status(401).send(new UnauthorizedException("Invalid token..."));
		res.status(401).send({ status: 401, message: "Invalid token..." });
		return proxyReq.end();
	}

	proxyReq.setHeader("decoded", JSON.stringify(decoded));
	return true;
}
