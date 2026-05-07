---
tracker:
  kind: linear
  api_key: $LINEAR_API_KEY
  project_slug: eeb1ee847ce9
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

hooks:
  after_create: |
    git clone https://github.com/JonCGroberg/JonCGroberg.github.io.git .
    git checkout -b symphony/$SYMPHONY_ISSUE
  before_remove: |
    git diff --stat HEAD
---

You are working on **{{ issue.identifier }}**: **{{ issue.title }}**.

{{ issue.description }}

Follow the repo's conventions. Write tests. Create a PR when done.
