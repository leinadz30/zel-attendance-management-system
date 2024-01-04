import { Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/payload.interface";
import { AuthService } from "src/services/auth.service";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    constructor(usersService: AuthService);
    validate(payload: JwtPayload): Promise<{
        userId: string;
    }>;
}
export {};
