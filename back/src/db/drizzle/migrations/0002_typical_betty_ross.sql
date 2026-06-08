DO $$ BEGIN
 CREATE TYPE "public"."notification_type_enum" AS ENUM('FRIEND_REQUEST', 'FRIEND_ACCEPT', 'SYSTEM');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notifications" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"user_uid" uuid NOT NULL,
	"type" "notification_type_enum" NOT NULL,
	"title" varchar(255) NOT NULL,
	"message" varchar(512) DEFAULT '' NOT NULL,
	"payload" jsonb,
	"is_read" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_uid_users_uid_fk" FOREIGN KEY ("user_uid") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
