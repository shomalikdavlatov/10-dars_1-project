import { Injectable, InternalServerErrorException, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client"

@Injectable()
export default class PrismaService extends PrismaClient implements OnModuleInit {
    onModuleInit() {
        try {
            this.$connect();
            console.log("Database connected!");
        }
        catch(error) {
            throw new InternalServerErrorException(error.message);
        }
    }
}