# vi.mock factories are retained across files with `isolate: false`

Minimal reproduction for a Vitest memory issue.

Each of the 30 test files mocks `dep.ts` with a factory that closes over ~10 MB (`vi.hoisted`). The setup file forces a
GC (`--expose-gc`) and appends the heap used at the start of every file to `heap.log`. Everything runs on one worker.

```sh
npm install
npm test            # isolate: false
cat heap.log        # 19, 28, 38, 47, 57 … 296 MB: grows by each file's factory scope
rm heap.log && RESET=1 npm test   # same with vi.resetModules() at the start of each file: still grows
rm heap.log && npm test -- --isolate   # isolate: true: flat at ~19 MB
```

All tests pass in every mode (each file sees its own mock); only the memory is never released.
Reproduces on vitest 5.0.3 and 4.1.11 (Node 24.11.1, macOS arm64).
