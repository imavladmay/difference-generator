import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const expectedString = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;

test('genDiff format json', () => {
  expect(genDiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toBe(expectedString);
});

test('genDiff format yml', () => {
  expect(genDiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml')).toBe(expectedString);
});
