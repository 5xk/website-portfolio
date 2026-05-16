/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DISCORD_USER_ID: string
  readonly VITE_GITHUB_USERNAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
