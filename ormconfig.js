const postgres_entities = process.env.ENVIRONMENT === 'production' ? ['./dist/modules/**/infra/typeorm/entities/*.js'] : ['./src/modules/**/infra/typeorm/entities/*.ts']
const postgres_migrations = process.env.ENVIRONMENT === 'production' ? ['./dist/infra/typeorm/migrations/*.js'] : ['./src/infra/typeorm/migrations/*.ts']
  
  
module.exports = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'postgresql',
    port: process.env.POSTGRES_PORT || 5432,
    database: process.env.POSTGRES_DB || 'admin',
    username: process.env.POSTGRES_USERNAME || 'admin',
    password: process.env.POSTGRES_PASSWORD || 'admin',
    entities: postgres_entities,
    migrations: postgres_migrations,
    cli: {
      migrationsDir: './src/infra/typeorm/migrations/',
    },
  }
];