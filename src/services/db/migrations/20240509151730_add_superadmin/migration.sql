	 INSERT INTO "users" ("email", "password")
   VALUES ('admin@catalog.study', '$2b$04$HXP8/5o1VI27bHsn6rd8v.htzIsVTjMY4seNI5poocNKxzOTgP3bG');


  INSERT INTO "user_to_role" ("user_id", "role_id")
  VALUES (
    (SELECT "id" FROM "users" WHERE "email" = 'admin@catalog.study'),
    (SELECT "id" FROM "roles" WHERE "role" = 'superadmin')
);
