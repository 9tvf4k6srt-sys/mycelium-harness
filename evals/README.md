# evals

Mechanical graders only in this scaffold. No model calls on the default path.

## Fixture: exact-match

File: `fixtures/exact-match.json`

```bash
node -e "
const fs = require('fs');
const f = JSON.parse(fs.readFileSync('evals/fixtures/exact-match.json','utf8'));
const pred = f.prediction;
const pass = pred === f.expected;
console.log(JSON.stringify({ id: f.id, pass, grader: f.grader }, null, 2));
process.exit(pass ? 0 : 1);
"
```

## What this proves

Exact-string equality is **mechanical** and offline-reproducible.

## What this does not prove

Agent reasoning quality, tool-use safety, or production eval maturity. See `docs/CREDIBILITY.md`.
