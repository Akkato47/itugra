DELETE FROM "user_skills" a
USING "user_skills" b
WHERE a."uid" < b."uid"
  AND a."profile_info_uid" = b."profile_info_uid"
  AND a."skill_uid" = b."skill_uid";
--> statement-breakpoint
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_profile_skill_unique" UNIQUE("profile_info_uid","skill_uid");