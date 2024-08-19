export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url: process.env.USER_MANAGEMENT_DATABASE_URL || 'postgresql://postgres:zPETms@localhost:5432/user_management',
  },
});
