# Currents Orchestration

This directory demonstrates **Currents Orchestration**, which provides optimized parallel execution compared to standard sharding.

## Workflows

| Workflow | Description |
| :--- | :--- |
| [`test-or8n.yml`](../.github/workflows/test-or8n.yml) | Orchestration with `pwc-p` + Blob Reporter |

## How it works

Unlike standard sharding (where tests are split by file count), Orchestration balances tests based on their historical duration.

### Key Components
1.  **`pwc-p`**: The Currents Orchestration CLI.
2.  **`currents.config.ts`**: Configuration file for orchestration.
3.  **Blob Reporter**: Used to merge reports from multiple machines.

## Configuration
- [`currents.config.ts`](./currents.config.ts): Contains the project ID, record key, and orchestration settings.
