print(
  'Start #################################################################'
);

db = db.getSiblingDB('medijolt_db');
db.createUser({
  user: 'medijolt_db_user',
  pwd: 'PRuEpa',
  roles: [{ role: 'readWrite', db: 'medijolt_db' }],
});
db.createCollection('users');

print('END #################################################################');
