import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response, Request } from "express";
import { User } from "../user.entity";
import { UserService } from "../user.service";

declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
            session?: {userId: number};
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware{
    constructor (private userService: UserService){}

    async use(req: Request, res: Response, next: NextFunction) {
        const {userId} = req.session || {}

        if(userId) {
            const user = await this.userService.fetchOne(userId)

            req.currentUser = user
        }

        next()
    }
}