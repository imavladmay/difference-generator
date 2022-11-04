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
  ['file1.json', 'file2.json', 'stylish', 'stylish.txt'],
  ['file1.json', 'file2.json', 'plain', 'plain.txt'],
  ['file1.json', 'file2.json', 'json', 'json.txt'],
  ['file1.yml', 'file2.yml', 'stylish', 'stylish.txt'],
  ['file1.yml', 'file2.yml', 'plain', 'plain.txt'],
  ['file1.yml', 'file2.yml', 'json', 'json.txt'],
])('genDiff(%#)', (file1, file2, format, expectedValue) => {
  const recieved = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  const expected = readFixture(expectedValue);
  expect(recieved).toEqual(expected);
});
