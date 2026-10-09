-- Hallway Track accounts. Practice records are NOT stored here: they stay in
-- each person's browser. This database holds who may sign in and the model
-- endpoint each of them uses.
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,            -- GitHub numeric user id
  login TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  avatar_url TEXT NOT NULL DEFAULT '',
  created_at INTEGER NOT NULL,
  last_seen_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS model_configs (
  user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('openai', 'anthropic')),
  base_url TEXT NOT NULL,
  api_key_enc TEXT NOT NULL,         -- AES-256-GCM, key held only in the Worker's secret
  key_hint TEXT NOT NULL,            -- last four characters, for display
  fast_model TEXT NOT NULL,
  smart_model TEXT NOT NULL,
  token_param TEXT NOT NULL DEFAULT 'max_tokens' CHECK (token_param IN ('max_tokens', 'max_completion_tokens')),
  effort TEXT NOT NULL DEFAULT 'default' CHECK (effort IN ('default', 'low', 'medium', 'high')),
  disable_thinking INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL
);
