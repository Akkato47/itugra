DO $$ BEGIN
 CREATE TYPE "public"."moderation_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."registration_kind_enum" AS ENUM('SOLO', 'TEAM');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."registration_status_enum" AS ENUM('REGISTERED', 'CANCELLED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "notification_type_enum" ADD VALUE 'EVENT';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "event_registration" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"event_uid" uuid NOT NULL,
	"user_uid" uuid NOT NULL,
	"team_uid" uuid,
	"kind" "registration_kind_enum" DEFAULT 'SOLO' NOT NULL,
	"status" "registration_status_enum" DEFAULT 'REGISTERED' NOT NULL,
	CONSTRAINT "event_registration_user_unique" UNIQUE("event_uid","user_uid"),
	CONSTRAINT "event_registration_team_unique" UNIQUE("event_uid","team_uid")
);
--> statement-breakpoint
ALTER TABLE "eventDocs" DROP CONSTRAINT "eventDocs_event_uid_request_uid_fk";
--> statement-breakpoint
ALTER TABLE "eventDocs" ALTER COLUMN "event_uid" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN "request_uid" uuid;--> statement-breakpoint
ALTER TABLE "eventDocs" ADD COLUMN "event_request_uid" uuid;--> statement-breakpoint
ALTER TABLE "request" ADD COLUMN "moderation_status" "moderation_status_enum" DEFAULT 'PENDING' NOT NULL;--> statement-breakpoint
ALTER TABLE "request" ADD COLUMN "moderation_reason" varchar(1000);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event_registration" ADD CONSTRAINT "event_registration_event_uid_event_uid_fk" FOREIGN KEY ("event_uid") REFERENCES "public"."event"("uid") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event_registration" ADD CONSTRAINT "event_registration_user_uid_users_uid_fk" FOREIGN KEY ("user_uid") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event_registration" ADD CONSTRAINT "event_registration_team_uid_team_uid_fk" FOREIGN KEY ("team_uid") REFERENCES "public"."team"("uid") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "event" ADD CONSTRAINT "event_request_uid_request_uid_fk" FOREIGN KEY ("request_uid") REFERENCES "public"."request"("uid") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eventDocs" ADD CONSTRAINT "eventDocs_event_uid_event_uid_fk" FOREIGN KEY ("event_uid") REFERENCES "public"."event"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "eventDocs" ADD CONSTRAINT "eventDocs_event_request_uid_request_uid_fk" FOREIGN KEY ("event_request_uid") REFERENCES "public"."request"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
