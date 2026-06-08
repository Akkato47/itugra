DO $$ BEGIN
 CREATE TYPE "public"."friend_status_enum" AS ENUM('PENDING', 'ACCEPTED');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_friends" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"requester_uid" uuid NOT NULL,
	"addressee_uid" uuid NOT NULL,
	"status" "friend_status_enum" NOT NULL,
	CONSTRAINT "user_friends_unique" UNIQUE("requester_uid","addressee_uid")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_friends" ADD CONSTRAINT "user_friends_requester_uid_users_uid_fk" FOREIGN KEY ("requester_uid") REFERENCES "public"."users"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_friends" ADD CONSTRAINT "user_friends_addressee_uid_users_uid_fk" FOREIGN KEY ("addressee_uid") REFERENCES "public"."users"("uid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_friends" ADD CONSTRAINT "user_friends_requester_uid_foreign" FOREIGN KEY ("requester_uid") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_friends" ADD CONSTRAINT "user_friends_addressee_uid_foreign" FOREIGN KEY ("addressee_uid") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
