import { cleanEnv, str, port } from "envalid";

function validateEnv() {
	cleanEnv(process.env, {
		NODE_ENV: str(),
		PORT_GATEWAY: port(),
		FRONTEND_HOST: str()
	});
}

export default validateEnv;
