export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: 'postgres',
    name: 'ecommerce',
    host: 'localhost',
    port: 5432,
    migrationsRun: true,
  },
});
