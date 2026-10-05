import { expect, test, vi } from 'vitest';
import { dep } from '../dep';

// ~10 MB that only this file's mock factory references.
const { payload } = vi.hoisted(() => ({ payload: Array.from({ length: 1_250_000 }, (_, i) => i) }));
vi.mock('../dep', () => ({ dep: () => String(payload.length) }));

test('t27 sees its own mock', () => {
  expect(dep()).toBe('1250000');
});
