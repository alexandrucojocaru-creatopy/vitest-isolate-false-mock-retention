import { appendFileSync } from 'node:fs';
import { beforeAll, vi } from 'vitest';

if (process.env.RESET === '1') vi.resetModules();
beforeAll(() => {
  (globalThis as { gc?: () => void }).gc?.();
  appendFileSync('heap.log', `${Math.round(process.memoryUsage().heapUsed / 1048576)}\n`);
});
