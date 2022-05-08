// array of conecctios odf databases
import { TypeOrmModule } from "@nestjs/typeorm";
import { Configuration } from "../config/config.keys";
import { ConfigService } from "../config/config.service";
import { ConnectionOptions } from "typeorm";
import { ConfigModule } from "../config/config.module";

export const databaseProviders = [
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        async useFactory(config: ConfigService) {
            return {
                ssl: true,
                type: 'postgres' as 'postgres',
                host: config.get(Configuration.PORT),
                username: config.get(Configuration.USERNAME),
                password: config.get(Configuration.PASSWORD),
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                migrations: [__dirname + '/migrations/*{.ts,js}']

            } as ConnectionOptions
        }
    })

]