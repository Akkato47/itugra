CREATE TABLE IF NOT EXISTS "team_invites" (
	"uid" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" date DEFAULT now() NOT NULL,
	"updated_at" date NOT NULL,
	"team_uid" uuid NOT NULL,
	"ctr_uid" uuid NOT NULL,
	"inviter_uid" uuid NOT NULL,
	"invitee_uid" uuid NOT NULL,
	CONSTRAINT "team_invites_team_invitee_unique" UNIQUE("team_uid","invitee_uid")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_invites" ADD CONSTRAINT "team_invites_team_uid_team_uid_fk" FOREIGN KEY ("team_uid") REFERENCES "public"."team"("uid") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_invites" ADD CONSTRAINT "team_invites_ctr_uid_custom_team_role_uid_fk" FOREIGN KEY ("ctr_uid") REFERENCES "public"."custom_team_role"("uid") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_invites" ADD CONSTRAINT "team_invites_inviter_uid_users_uid_fk" FOREIGN KEY ("inviter_uid") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_invites" ADD CONSTRAINT "team_invites_invitee_uid_users_uid_fk" FOREIGN KEY ("invitee_uid") REFERENCES "public"."users"("uid") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
