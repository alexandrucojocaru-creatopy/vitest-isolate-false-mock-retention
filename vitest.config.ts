import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { isolate: false, pool: 'threads', maxWorkers: 1, fileParallelism: false, setupFiles: ['./heap.setup.ts'] },
});
