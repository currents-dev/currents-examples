# Currents Orchestration Example

[Demo video](https://www.loom.com/share/e2a4ec0167d74e69b9f07d45707cf0f4?sid=b003d756-0e5d-400d-b2a8-3279b63804f2)

### Configuring Batch Size

It is recommended to set `batchSize = workers`

- Use `--pwc-batch-size` CLI params, e.g.: `pwc-p --pwc-batch-size=3`
- Set environment variable `CURRENTS_BATCH_SIZE` e.g.: `CURRENTS_BATCH_SIZE=3`
- Set the values in `currents.confg.ts`, e.g.: `orchestration.batchSize: 3`

### Suite Composition

- 40 long-running tests: 110-120s
- 40 short tests: 10-30s

### Playwright Sharding

- workers: 2
- machines: 5
- overall duration: **15m 38s** 🐌

![currents-2025-04-28-16 38 18@2x](https://github.com/user-attachments/assets/2ab6b34a-634d-46a3-810b-bbfa4487cd20)

### Currents Batched Orchestration

- batch size: 2
- workers: 2
- machines: 5
- overall duration: **9m 17s** (~41% improvement) 🏎️

![currents-2025-04-28-16 39 34@2x](https://github.com/user-attachments/assets/206a87f1-3f1d-4bcd-bb96-88855acd455d)
