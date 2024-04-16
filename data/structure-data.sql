DROP TABLE IF EXISTS "categories", "products", "roles", "users";

CREATE TABLE "categories" (
    "id"         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"       TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "products" (
    "id"              INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "ref"             TEXT NOT NULL,
    "title"           TEXT NOT NULL,
    "description"     TEXT NOT NULL,
    "image"           TEXT NOT NULL,
    "price"           INTEGER NOT NULL,
    "category_id"     INTEGER REFERENCES categories("id"),
    "created_at"      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at"      TIMESTAMPTZ
);

CREATE TABLE "roles" (
    "id"         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"       TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "users" (
    "id"         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"       TEXT,
    "email"      TEXT NOT NULL,
    "password"   TEXT NOT NULL,
    "role_id"    INTEGER REFERENCES roles("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

-- Data for Name: categories; 
INSERT INTO "categories" ("name")
VALUES ('Laptop'),
('Mobile');


-- Data for Name: products;
INSERT INTO "products" ("ref", "title", "description", "image", "price", "category_id")
VALUES ('P00001', 'Macbroke', 'Le PC portable de la marque à la poire.', 'https://picsum.photos/seed/1/300/200', 1000, 1),
('P00002', 'iFraude', 'Le smartphone phare de la marque à la poire.', 'https://picsum.photos/seed/2/300/200', 1300, 2),
('P00002', 'Dell Pasunrond', 'Un ordinateur portable pas cher mais pas top.', 'https://picsum.photos/seed/3/300/200', 500, 1);

-- Data for Name: roles;
INSERT INTO "roles" ("name")
VALUES ('customer'),
('admin');

-- Data for Name: users;
INSERT INTO "users" ("name", "email", "password", "role_id")
VALUES ('John Example', 'example@example.com', '$2b$10$nIIIGWlkm3SzwVF81h4qOekR8ABLUqXoiWAVSkB6oNpKroyyky84G', 1), 
('Maurice Admin', 'admin@admin.com', '$2b$10$nIIIGWlkm3SzwVF81h4qOekR8ABLUqXoiWAVSkB6oNpKroyyky84G', 2);