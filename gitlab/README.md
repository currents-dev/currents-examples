# GitLab

Playwright + Currents examples that live in GitLab (not vendored in full in this monorepo).

## Playwright on GitLab CI

The reference project is hosted here:

**[gitlab.com/currents.dev/gitlab-playwright-currents](https://gitlab.com/currents.dev/gitlab-playwright-currents)**

Clone it from GitLab, or use the git submodule in this repo (see below).

### Submodule checkout

This repository includes [`gitlab-playwright-currents`](./gitlab-playwright-currents/) as a **git submodule** pointing at that GitLab project. After cloning `currents-examples`:

```bash
git submodule update --init --recursive
```

Or clone with submodules in one step:

```bash
git clone --recurse-submodules https://github.com/currents-dev/currents-examples.git
```

If the submodule directory is empty, run `git submodule update --init gitlab/gitlab-playwright-currents` from the repo root.
