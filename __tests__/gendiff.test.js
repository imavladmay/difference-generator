import { test, expect } from '@jest/globals';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');

test.each([
  ['file1.json', 'file2.json'],
  ['file1.json', 'file2.json', 'stylish'],
  ['file1.json', 'file2.json', 'plain'],
  ['file1.json', 'file2.json', 'json'],
  ['file1.yml', 'file2.yml'],
  ['file1.yml', 'file2.yml', 'stylish'],
  ['file1.yml', 'file2.yml', 'plain'],
  ['file1.yml', 'file2.yml', 'json'],
])('genDiff(%#)', (file1, file2, format = 'stylish') => {
  const recieved = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  const expected = (formatter) => {
    switch (formatter) {
      case 'stylish':
        return readFixture('stylish.txt');
      case 'plain':
        return readFixture('plain.txt');
      case 'json':
        return readFixture('json.txt');
      default:
        throw new Error(`${formatter} is not defined`);
    }
  };
  expect(recieved).toBe(expected(format));
});
