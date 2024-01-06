import { DataSource, DataSourceOptions } from 'typeorm';
export const dbdatasource: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'valuecar',
    synchronize: false,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/src/migration/*{.ts,.js}'],
    migrationsTableName: 'migrations_TypeORM',
};

const dataSource = new DataSource(dbdatasource)
export default dataSource


