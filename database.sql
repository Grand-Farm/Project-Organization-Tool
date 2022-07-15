CREATE TABLE "company" (
	"id" serial primary KEY,
	"company_name" VARCHAR(255) NOT NULL,
	"full_time_rate" decimal,
	"allocated_hours" DECIMAL,
	"intern_rate" decimal,
	"contract_start" DATE,
	"is_archived" boolean default false
);

CREATE TABLE "user_company"(
"id" serial primary key,
"user_id" int references "user",
"company_id" int references "company"
);

CREATE TABLE "user" (
	"id" serial primary key,
	"username" varchar(255) UNIQUE  NOT NULL,
	"password" varchar(250) NOT NULL,
	"is_intern" boolean default false,
	"is_admin" boolean default false,
	"email" varchar(1000)
);

CREATE TABLE "projects" (
	"id" serial primary key,
	"name" varchar(250) NOT NULL,
	"budgeted_hours" decimal NOT NULL,
	"manager" varchar(250) NOT NULL,
	"description" text NOT NULL,
	"outcome" text NOT NULL,
	"company_id" int references "company"
);


CREATE TABLE "activity" (
	"id" serial primary key,
	"type" varchar(250),
	"notes" text,
	"activity_date" date,
	"projects_id" int references "projects"
);

CREATE TABLE "activity_employee"(
"id" serial primary key,
"user_id" int references "user" NOT NULL,
"activity_id" int references "activity" NOT NULL,
"employee_hours" decimal NOT NULL

);
