# AI Front Desk

React / Express / tRPC / Drizzle starter, adapted from the Sandbox web-db-user template.

- `pnpm dev`: development server; honors `PORT` (default 3000).
- `pnpm build` / `pnpm start`: build and serve `dist/index.js` and `dist/public/`.
- `pnpm db:migrate`: apply checked-in migrations. `pnpm db:push`: generate and apply new schema changes.
- `pnpm check` / `pnpm test`: types and application tests.

Start with the Webdev skill's default-template guide. Platform login, storage, payments and service contracts live in its shared references; read the relevant capability before extending its helper.

`server/_core/publicConfig.ts` exposes only named public runtime values. Private keys stay server-side. The platform serves managed `/manus-storage/` assets; the application does not register a second proxy.

Platform configuration is readable and editable through `webdev.config`. Default settings are initial values, not enforced constraints. The agent may modify the files, commands and configuration or follow the flexible guide for another stack.

## Connected AOSSIE Agent

The Front Desk page reads `/api/frontdesk` from the dashboard server. Configure the server-side variables below; the Agent token is never sent to the browser:

```env
AGENT_API_URL=https://your-aossie-agent.example.com
AGENT_API_TOKEN=the-same-value-as-FRONTDESK_API_TOKEN
```

The Discord Agent exposes an authenticated read-only provider API at `/api/frontdesk`. Set `FRONTDESK_API_TOKEN` in the Agent deployment and use the same secret as `AGENT_API_TOKEN` in the dashboard deployment. The dashboard shows **live · Discord online** when the connection works and **demo data** when the URL is not configured, rather than presenting mock records as live data.
