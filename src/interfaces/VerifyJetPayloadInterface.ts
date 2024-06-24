import { JwtPayload } from "jsonwebtoken";

export default interface VerifyJwtPayloadInterface extends JwtPayload {

    userId: string;

};