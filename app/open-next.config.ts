import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No incremental cache: every page here is either static or a per-request API route.
export default defineCloudflareConfig();
