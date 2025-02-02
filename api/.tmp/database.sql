BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "admin_users" (
	"id"	integer NOT NULL,
	"document_id"	varchar(255),
	"firstname"	varchar(255),
	"lastname"	varchar(255),
	"username"	varchar(255),
	"email"	varchar(255),
	"password"	varchar(255),
	"reset_password_token"	varchar(255),
	"registration_token"	varchar(255),
	"is_active"	boolean,
	"blocked"	boolean,
	"prefered_language"	varchar(255),
	"created_at"	datetime,
	"updated_at"	datetime,
	"published_at"	datetime,
	"created_by_id"	integer,
	"updated_by_id"	integer,
	"locale"	varchar(255),
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "admin_users_created_by_id_fk" FOREIGN KEY("created_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "admin_users_created_by_id_fk" FOREIGN KEY("created_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "admin_users_updated_by_id_fk" FOREIGN KEY("updated_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "admin_users_updated_by_id_fk" FOREIGN KEY("updated_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS "carts" (
	"id"	integer NOT NULL,
	"document_id"	varchar(255),
	"item"	json,
	"created_at"	datetime,
	"updated_at"	datetime,
	"published_at"	datetime,
	"created_by_id"	integer,
	"updated_by_id"	integer,
	"locale"	varchar(255),
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "carts_created_by_id_fk" FOREIGN KEY("created_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "carts_created_by_id_fk" FOREIGN KEY("created_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "carts_updated_by_id_fk" FOREIGN KEY("updated_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "carts_updated_by_id_fk" FOREIGN KEY("updated_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS "categories" (
	"id"	integer NOT NULL,
	"document_id"	varchar(255),
	"title"	varchar(255),
	"created_at"	datetime,
	"updated_at"	datetime,
	"published_at"	datetime,
	"created_by_id"	integer,
	"updated_by_id"	integer,
	"locale"	varchar(255),
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "categories_created_by_id_fk" FOREIGN KEY("created_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "categories_created_by_id_fk" FOREIGN KEY("created_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "categories_updated_by_id_fk" FOREIGN KEY("updated_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "categories_updated_by_id_fk" FOREIGN KEY("updated_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS "orders" (
	"id"	integer NOT NULL,
	"document_id"	varchar(255),
	"created_at"	datetime,
	"updated_at"	datetime,
	"published_at"	datetime,
	"created_by_id"	integer,
	"updated_by_id"	integer,
	"locale"	varchar(255),
	"order_status"	varchar(255),
	"total_price"	float,
	"address"	varchar(255),
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "orders_created_by_id_fk" FOREIGN KEY("created_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "orders_created_by_id_fk" FOREIGN KEY("created_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "orders_updated_by_id_fk" FOREIGN KEY("updated_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "orders_updated_by_id_fk" FOREIGN KEY("updated_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS "products" (
	"id"	integer NOT NULL,
	"document_id"	varchar(255),
	"name"	varchar(255),
	"description"	varchar(255),
	"price"	float,
	"size"	json,
	"color"	json,
	"stock"	integer,
	"created_at"	datetime,
	"updated_at"	datetime,
	"published_at"	datetime,
	"created_by_id"	integer,
	"updated_by_id"	integer,
	"locale"	varchar(255),
	"new"	boolean,
	"rating"	float,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "products_created_by_id_fk" FOREIGN KEY("created_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "products_created_by_id_fk" FOREIGN KEY("created_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "products_updated_by_id_fk" FOREIGN KEY("updated_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "products_updated_by_id_fk" FOREIGN KEY("updated_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS "reviews" (
	"id"	integer NOT NULL,
	"document_id"	varchar(255),
	"comment"	text,
	"created_at"	datetime,
	"updated_at"	datetime,
	"published_at"	datetime,
	"created_by_id"	integer,
	"updated_by_id"	integer,
	"locale"	varchar(255),
	"rating"	float,
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "reviews_created_by_id_fk" FOREIGN KEY("created_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "reviews_created_by_id_fk" FOREIGN KEY("created_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "reviews_updated_by_id_fk" FOREIGN KEY("updated_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "reviews_updated_by_id_fk" FOREIGN KEY("updated_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS "up_roles" (
	"id"	integer NOT NULL,
	"document_id"	varchar(255),
	"name"	varchar(255),
	"description"	varchar(255),
	"type"	varchar(255),
	"created_at"	datetime,
	"updated_at"	datetime,
	"published_at"	datetime,
	"created_by_id"	integer,
	"updated_by_id"	integer,
	"locale"	varchar(255),
	PRIMARY KEY("id" AUTOINCREMENT),
	CONSTRAINT "up_roles_created_by_id_fk" FOREIGN KEY("created_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "up_roles_created_by_id_fk" FOREIGN KEY("created_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "up_roles_updated_by_id_fk" FOREIGN KEY("updated_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL,
	CONSTRAINT "up_roles_updated_by_id_fk" FOREIGN KEY("updated_by_id") REFERENCES "admin_users"("id") ON DELETE SET NULL
);
INSERT INTO "admin_users" VALUES (1,'d3p3sl7agh8tkpuno653h2yg','admin','webdev',NULL,'admin@webdev.com','$2a$10$WR3UCbXelkNNX0kYwHN33uZ.F6t/5YOCsaJQOI7hYju7NRnvGYCEC',NULL,NULL,1,0,NULL,1738393275716,1738393275716,1738393275717,NULL,NULL,NULL);
INSERT INTO "carts" VALUES (1,'jw8sa5fs74pthespx3n8mpej','[{"product_id": 1, "qty": 1}, {"product_id": 2, "qty": 1}]',1738469786351,1738469786351,NULL,1,1,NULL);
INSERT INTO "carts" VALUES (2,'jw8sa5fs74pthespx3n8mpej','[{"product_id":1,"qty":1},{"product_id":2,"qty":1}]',1738469786351,1738469786351,1738469786386,1,1,NULL);
INSERT INTO "carts" VALUES (3,'ar9p0b6e28tp6nn52z8d0alj','[[1,1],[2,2]]',1738470277119,1738470277119,NULL,1,1,NULL);
INSERT INTO "carts" VALUES (4,'ar9p0b6e28tp6nn52z8d0alj','[[1,1],[2,2]]',1738470277119,1738470277119,1738470277146,1,1,NULL);
INSERT INTO "categories" VALUES (1,'m5pjfo6iv44cstbiueva01v5','sneakers',1738469106263,1738469106263,NULL,1,1,NULL);
INSERT INTO "categories" VALUES (2,'m5pjfo6iv44cstbiueva01v5','sneakers',1738469106263,1738469106263,1738469106301,1,1,NULL);
INSERT INTO "categories" VALUES (5,'j7uozxaewjp9qa8rdy5sssk5','running',1738469135068,1738469135068,NULL,1,1,NULL);
INSERT INTO "categories" VALUES (6,'j7uozxaewjp9qa8rdy5sssk5','running',1738469135068,1738469135068,1738469135093,1,1,NULL);
INSERT INTO "categories" VALUES (7,'ri4qp861xcsmstdq0rd7w9l1','casual',1738469150749,1738469150749,NULL,1,1,NULL);
INSERT INTO "categories" VALUES (8,'ri4qp861xcsmstdq0rd7w9l1','casual',1738469150749,1738469150749,1738469150769,1,1,NULL);
INSERT INTO "orders" VALUES (1,'gfm12537rrpnhjzcyxgj3sif',1738469969752,1738469969752,NULL,1,1,NULL,'Pending',NULL,'my home');
INSERT INTO "orders" VALUES (2,'gfm12537rrpnhjzcyxgj3sif',1738469969752,1738469969752,1738469969778,1,1,NULL,'Pending',NULL,'my home');
INSERT INTO "products" VALUES (1,'hzbt3su3l27vsjcs8wt15mse','Nike Air Max 270',NULL,4500.0,'[38,39,40]','["Black","Red"]',100,1738469192735,1738469192735,NULL,1,1,NULL,1,0.0);
INSERT INTO "products" VALUES (2,'hzbt3su3l27vsjcs8wt15mse','Nike Air Max 270',NULL,4500.0,'[38,39,40]','["Black","Red"]',100,1738469192735,1738469192735,1738469192765,1,1,NULL,1,0.0);
INSERT INTO "products" VALUES (3,'frnv7ocr7diqq49g0t18clqv','Adidas Ultraboost',NULL,5000.0,'[39,40,41,42]','["White","Blue"]',5,1738469234506,1738469234506,NULL,1,1,NULL,1,0.0);
INSERT INTO "products" VALUES (4,'frnv7ocr7diqq49g0t18clqv','Adidas Ultraboost',NULL,5000.0,'[39,40,41,42]','["White","Blue"]',5,1738469234506,1738469234506,1738469234540,1,1,NULL,1,0.0);
INSERT INTO "products" VALUES (5,'pfsv4rtzqp9rqrub9xli6ctc','Converse Chuck 70',NULL,3200.0,'[38,39,40]','["Black","White"]',20,1738469325836,1738469325836,NULL,1,1,NULL,1,0.0);
INSERT INTO "products" VALUES (6,'pfsv4rtzqp9rqrub9xli6ctc','Converse Chuck 70',NULL,3200.0,'[38,39,40]','["Black","White"]',20,1738469325836,1738469325836,1738469325872,1,1,NULL,1,0.0);
INSERT INTO "reviews" VALUES (1,'pi7lhjiiisxs4cgo2bmskwcy','such a good shoe',1738469991591,1738469991591,NULL,1,1,NULL,5.0);
INSERT INTO "reviews" VALUES (2,'pi7lhjiiisxs4cgo2bmskwcy','such a good shoe',1738469991591,1738469991591,1738469991613,1,1,NULL,5.0);
INSERT INTO "reviews" VALUES (3,'qg2s5gozd7xpq4ez2lm154gr','what a bad shoe',1738470015545,1738470015545,NULL,1,1,NULL,1.0);
INSERT INTO "reviews" VALUES (4,'qg2s5gozd7xpq4ez2lm154gr','what a bad shoe',1738470015545,1738470015545,1738470015565,1,1,NULL,1.0);
INSERT INTO "up_roles" VALUES (1,'f9j3g6fygo2trbzmah0mp9kw','Authenticated','Default role given to authenticated user.','authenticated',1738393222258,1738393222258,1738393222258,NULL,NULL,NULL);
INSERT INTO "up_roles" VALUES (2,'x2pxndoaakidsst21us5a254','Public','Default role given to unauthenticated user.','public',1738393222262,1738393222262,1738393222262,NULL,NULL,NULL);
INSERT INTO "up_roles" VALUES (3,'gwq1g7gia3llczssdzcqlwng','CUSTOMER','customer role','customer',1738469708843,1738469764448,1738469708848,NULL,NULL,NULL);
INSERT INTO "up_roles" VALUES (4,'j8d9okvsqdmxndhxnukbb333','ADMIN','admin role','admin',1738469748087,1738469748087,1738469748088,NULL,NULL,NULL);
CREATE INDEX IF NOT EXISTS "admin_users_created_by_id_fk" ON "admin_users" (
	"created_by_id"
);
CREATE INDEX IF NOT EXISTS "admin_users_documents_idx" ON "admin_users" (
	"document_id",
	"locale",
	"published_at"
);
CREATE INDEX IF NOT EXISTS "admin_users_updated_by_id_fk" ON "admin_users" (
	"updated_by_id"
);
CREATE INDEX IF NOT EXISTS "carts_created_by_id_fk" ON "carts" (
	"created_by_id"
);
CREATE INDEX IF NOT EXISTS "carts_documents_idx" ON "carts" (
	"document_id",
	"locale",
	"published_at"
);
CREATE INDEX IF NOT EXISTS "carts_updated_by_id_fk" ON "carts" (
	"updated_by_id"
);
CREATE INDEX IF NOT EXISTS "categories_created_by_id_fk" ON "categories" (
	"created_by_id"
);
CREATE INDEX IF NOT EXISTS "categories_documents_idx" ON "categories" (
	"document_id",
	"locale",
	"published_at"
);
CREATE INDEX IF NOT EXISTS "categories_updated_by_id_fk" ON "categories" (
	"updated_by_id"
);
CREATE INDEX IF NOT EXISTS "orders_created_by_id_fk" ON "orders" (
	"created_by_id"
);
CREATE INDEX IF NOT EXISTS "orders_documents_idx" ON "orders" (
	"document_id",
	"locale",
	"published_at"
);
CREATE INDEX IF NOT EXISTS "orders_updated_by_id_fk" ON "orders" (
	"updated_by_id"
);
CREATE INDEX IF NOT EXISTS "products_created_by_id_fk" ON "products" (
	"created_by_id"
);
CREATE INDEX IF NOT EXISTS "products_documents_idx" ON "products" (
	"document_id",
	"locale",
	"published_at"
);
CREATE INDEX IF NOT EXISTS "products_updated_by_id_fk" ON "products" (
	"updated_by_id"
);
CREATE INDEX IF NOT EXISTS "reviews_created_by_id_fk" ON "reviews" (
	"created_by_id"
);
CREATE INDEX IF NOT EXISTS "reviews_documents_idx" ON "reviews" (
	"document_id",
	"locale",
	"published_at"
);
CREATE INDEX IF NOT EXISTS "reviews_updated_by_id_fk" ON "reviews" (
	"updated_by_id"
);
CREATE INDEX IF NOT EXISTS "up_roles_created_by_id_fk" ON "up_roles" (
	"created_by_id"
);
CREATE INDEX IF NOT EXISTS "up_roles_documents_idx" ON "up_roles" (
	"document_id",
	"locale",
	"published_at"
);
CREATE INDEX IF NOT EXISTS "up_roles_updated_by_id_fk" ON "up_roles" (
	"updated_by_id"
);
COMMIT;
