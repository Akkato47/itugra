DO $$ BEGIN
 CREATE TYPE "public"."event_enum" AS ENUM('HACKATON', 'MEETUP');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."ability_enum" AS ENUM('ALL', 'EDIT', 'POST', 'INVITE', 'DELETE', 'EVENTREG', 'NOTHING');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."team_enum" AS ENUM('TEMP', 'PERMANENT', 'BANNED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."edu_enum" AS ENUM('FULL', 'PART', 'DIST');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."file_enum" AS ENUM('DIP', 'PORTFOLIO', 'RESUME');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."role_enum" AS ENUM('USER', 'ORG', 'ADMIN', 'SU');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."via_enum" AS ENUM('BASE', 'VK', 'YA', 'GOS', 'TG');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" jsonb,
	"description" varchar(255) NOT NULL,
	"documents" jsonb[],
	"type" "event_enum" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "eventDocs" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"document" jsonb NOT NULL,
	"private" boolean,
	"event_uid" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hackaton" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" jsonb,
	"description" varchar(255),
	"type" "event_enum" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "custom_team_role" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"name" varchar(255) NOT NULL,
	"abilities" ability_enum[] NOT NULL,
	"color" varchar(255) NOT NULL,
	"team_uid" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"name" varchar(255) NOT NULL,
	"about" text,
	"image" jsonb,
	"type" "team_enum" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_team_role" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"user_uid" uuid NOT NULL,
	"team_uid" uuid NOT NULL,
	"ctr_uid" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "files" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"key" varchar(255) NOT NULL,
	"url" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"uploader" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "images" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"key" varchar(255) NOT NULL,
	"url" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"uploader" uuid NOT NULL,
	"thumbnail" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_education" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"university" varchar(255) DEFAULT '' NOT NULL,
	"direction" varchar(255) DEFAULT '' NOT NULL,
	"format" "edu_enum" DEFAULT 'FULL' NOT NULL,
	"start_date" date,
	"end_date" date,
	"profile_info_uid" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_experience" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"name" varchar(255) NOT NULL,
	"position" varchar(255) NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"present" boolean DEFAULT false NOT NULL,
	"profile_info_uid" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_files" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"category" "file_enum" NOT NULL,
	"file" jsonb NOT NULL,
	"profile_info_uid" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_interests" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"name" varchar(255) DEFAULT '' NOT NULL,
	"profile_info_uid" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_location" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"country" varchar(255) DEFAULT '' NOT NULL,
	"region" varchar(255) DEFAULT '' NOT NULL,
	"city" varchar(255) DEFAULT '' NOT NULL,
	"profile_info_uid" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_profle_info" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"is_searching_job" boolean DEFAULT false NOT NULL,
	"status" varchar(255) DEFAULT '' NOT NULL,
	"about" varchar(255) DEFAULT '' NOT NULL,
	"user_uid" uuid
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_skills" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"name" varchar(255) DEFAULT '' NOT NULL,
	"profile_info_uid" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"oauth_id" varchar(16),
	"full_name" varchar(255) NOT NULL,
	"tag" varchar(12) NOT NULL,
	"mail" varchar(255) NOT NULL,
	"password" varchar(255),
	"phone" varchar(255) NOT NULL,
	"role" "role_enum" NOT NULL,
	"birth_date" date NOT NULL,
	"image" jsonb,
	"background_image" jsonb,
	"via" "via_enum" NOT NULL,
	CONSTRAINT "users_oauth_id_unique" UNIQUE("oauth_id"),
	CONSTRAINT "users_tag_unique" UNIQUE("tag"),
	CONSTRAINT "users_mail_unique" UNIQUE("mail"),
	CONSTRAINT "users_phone_unique" UNIQUE("phone")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "custom_team_role" ADD CONSTRAINT "custom_team_role_team_uid_team_uid_fk" FOREIGN KEY ("team_uid") REFERENCES "public"."team"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "custom_team_role" ADD CONSTRAINT "custom_team_role_team_uid_foreign" FOREIGN KEY ("team_uid") REFERENCES "public"."team"("uid") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_team_role" ADD CONSTRAINT "user_team_role_user_uid_users_uid_fk" FOREIGN KEY ("user_uid") REFERENCES "public"."users"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_team_role" ADD CONSTRAINT "user_team_role_team_uid_team_uid_fk" FOREIGN KEY ("team_uid") REFERENCES "public"."team"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_team_role" ADD CONSTRAINT "user_team_role_ctr_uid_custom_team_role_uid_fk" FOREIGN KEY ("ctr_uid") REFERENCES "public"."custom_team_role"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_team_role" ADD CONSTRAINT "UTR_user_uid_foreign" FOREIGN KEY ("user_uid") REFERENCES "public"."users"("uid") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_team_role" ADD CONSTRAINT "UTR_team_uid_foreign" FOREIGN KEY ("team_uid") REFERENCES "public"."team"("uid") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_team_role" ADD CONSTRAINT "UTR_role_uid_foreign" FOREIGN KEY ("ctr_uid") REFERENCES "public"."custom_team_role"("uid") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_education" ADD CONSTRAINT "user_education_profile_info_uid_user_profle_info_uid_fk" FOREIGN KEY ("profile_info_uid") REFERENCES "public"."user_profle_info"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_experience" ADD CONSTRAINT "user_experience_profile_info_uid_user_profle_info_uid_fk" FOREIGN KEY ("profile_info_uid") REFERENCES "public"."user_profle_info"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_experience" ADD CONSTRAINT "user_experience_profile_info_uid_foreign" FOREIGN KEY ("profile_info_uid") REFERENCES "public"."user_profle_info"("uid") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_files" ADD CONSTRAINT "user_files_profile_info_uid_user_profle_info_uid_fk" FOREIGN KEY ("profile_info_uid") REFERENCES "public"."user_profle_info"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_files" ADD CONSTRAINT "user_files_profile_info_uid_foreign" FOREIGN KEY ("profile_info_uid") REFERENCES "public"."user_profle_info"("uid") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_interests" ADD CONSTRAINT "user_skills_profile_info_uid_foreign" FOREIGN KEY ("profile_info_uid") REFERENCES "public"."user_profle_info"("uid") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_location" ADD CONSTRAINT "user_location_profile_info_uid_user_profle_info_uid_fk" FOREIGN KEY ("profile_info_uid") REFERENCES "public"."user_profle_info"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profle_info" ADD CONSTRAINT "user_profle_info_user_uid_users_uid_fk" FOREIGN KEY ("user_uid") REFERENCES "public"."users"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_profile_info_uid_foreign" FOREIGN KEY ("profile_info_uid") REFERENCES "public"."user_profle_info"("uid") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
