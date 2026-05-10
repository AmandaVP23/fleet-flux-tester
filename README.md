# fleet-flux-tester

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run superAdmin.ts
```

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.


extend to:
JSON-driven execution
```json
{
    "steps": [
      { "scope": "admin", "action": "createVehicle", "params": { "type": "car" } },
      { "scope": "tenant", "action": "createOrder", "params": { "product": "car" } }
    ]
}
```

create multiple, example createUser --count=3 -> cria 3 users