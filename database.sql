
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" character varying(80) NOT NULL,
	"password" character varying(100) NOT NULL,
	"city" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" text NOT NULL,
	CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "items" (
	"id" serial NOT NULL,
	"title" varchar(75) NOT NULL,
	"description" varchar(255) NOT NULL,
	"condition" varchar(50) NOT NULL,
	"category" integer NOT NULL,
	"age" varchar(75) NOT NULL,
	"available" BOOLEAN NOT NULL DEFAULT 'true',
	"image_url" varchar(255) NOT NULL,
	"user_id" integer NOT NULL,
	"claimer_id" integer,
	CONSTRAINT "items_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "Categories" ( 
	"id" serial NOT NULL,
	"category" varchar (255) NOT NULL,
	CONSTRAINT "Categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "items" ADD CONSTRAINT "items_fk0" FOREIGN KEY ("category") REFERENCES "Categories"("id");
ALTER TABLE "items" ADD CONSTRAINT "items_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "items" ADD CONSTRAINT "items_fk2" FOREIGN KEY ("claimer_id") REFERENCES "user"("id");


