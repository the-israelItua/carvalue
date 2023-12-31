import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'valuecar',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/src/migration/*{.ts,.js}'],
    migrationsTableName: 'migrations_TypeORM',
    migrationsRun: true,
    synchronize: false,
    logging: true
}