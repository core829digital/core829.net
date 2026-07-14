import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval("clean-expired-sessions", { hours: 24 }, internal.auth.cleanExpiredSessions);

export default crons;
