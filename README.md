![Deploy](https://github.com/emreturgutce/clothing-store/workflows/Deploy%20Workflow/badge.svg) [![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs) [![Version](https://badge.fury.io/gh/tterb%2FHyde.svg)](https://badge.fury.io/gh/tterb%2FHyde)

## Ticketing

Ticketing is an open-source microservices e-commerce project that can handle user registrations, ticket orders, payments. I built this app using Node.js, Next.js, Kubernetes.

### Requirements

- Node.js
- Docker and Kubernetes
- Skaffold (Optional)

### Installation

```bash
  git clone https://github.com/emreturgutce/ticketing.git
```

#### With Skaffold

```bash
  skaffold dev
```

#### Without Skaffold

You will have to run all kubernetes deployments in the infra directory manually
