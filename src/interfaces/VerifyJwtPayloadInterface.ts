import { JwtPayload } from "jsonwebtoken";


export default interface VerifyJwtPayoadInterface extends JwtPayload {
    userId: string;
};