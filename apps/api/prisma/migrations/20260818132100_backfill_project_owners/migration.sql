INSERT INTO "ProjectMember" ("id", "projectId", "userId", "createdAt")
SELECT CONCAT('owner_', "id"), "id", "userId", CURRENT_TIMESTAMP
FROM "Project"
ON CONFLICT ("projectId", "userId") DO NOTHING;
