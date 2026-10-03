# Finished Jest test files stay in memory on Node 24+

Jest runs every test file in its own `vm` context. On Node 24 and 26, once one test file runs enough
tests for Jest's runner code to get optimized, the contexts of every later test file stay in memory:
V8's retained maps keep them alive, and a normal full GC never frees them. Node 22 frees them.

```sh
npm install
npm run repro        # Node 24/26: "still in memory" climbs to 8
npm run repro:fixed  # --retain-maps-for-n-gc=0: "still in memory" stays at 1
```

`counting-environment.js` wraps Jest's node environment. After each test file it forces a GC and
prints how many test-file globals are still in memory. Only the current file's should be.
