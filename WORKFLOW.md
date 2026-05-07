---
tracker:
  kind: linear
  api_key: $LINEAR_API_KEY
  project_slug: groberg
  active_states:
    - Todo
    - In Progress

workspace:
  root: ~/symphony_workspaces

agent:
  max_concurrent_agents: 3
  max_turns: 20

codex:
  command: codex app-server

server:
  port: 8080
---

You are working on **{{ issue.identifier }}**: **{{ issue.title }}**.

{{ issue.description }}

Follow the repo's conventions. Write tests. Create a PR when done.
