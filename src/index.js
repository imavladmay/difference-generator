import { readFileSync } from 'node:fs';
import path from 'node:path';
import _ from 'lodash';

const genDiff = (file1, file2) => {
  const fileKeys1 = Object.keys(file1);
  const fileKeys2 = Object.keys(file2);
  const unionKeys = _.union(fileKeys1, fileKeys2);
  const sortedKeys = unionKeys.sort();

  const result = sortedKeys.map((key) => {
    if (!Object.hasOwn(file2, key)) {
      return `- ${key}: ${file1[key]}`;
    }
    if (!Object.hasOwn(file1, key)) {
      return `+ ${key}: ${file2[key]}`;
    }
    if (file1[key] === file2[key]) {
      return `  ${key}: ${file1[key]}`;
    }
    if (file1[key] !== file2[key]) {
      return `- ${key}: ${file1[key]}\n+ ${key}: ${file2[key]}`;
    }
  });

  return `{\n${result.join('\n')}\n}`;
};

export default (filepath1, filepath2) => {
  const data1 = readFileSync(path.resolve(filepath1), 'utf-8');
  const data2 = readFileSync(path.resolve(filepath2), 'utf-8');

  const parsedData1 = JSON.parse(data1);
  const parsedData2 = JSON.parse(data2);

  return genDiff(parsedData1, parsedData2);
};
