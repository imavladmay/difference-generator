import _ from 'lodash';

const getFormattedValue = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return value;
};

export default (tree) => {
  const iter = (node, path) => {
    const lines = node
      .map((diff) => {
        const keyPath = (path === '' ? `${diff.key}` : `${path}.${diff.key}`);

        switch (diff.type) {
          case 'nested':
            return iter(diff.children, keyPath);
          case 'added':
            return `Property '${keyPath}' was added with value: ${getFormattedValue(diff.value)}`;
          case 'removed':
            return `Property '${keyPath}' was removed`;
          case 'changed':
            return `Property '${keyPath}' was updated. From ${getFormattedValue(diff.value1)} to ${getFormattedValue(diff.value2)}`;
          case 'unchanged':
            return null;
          default:
            throw new Error(`${diff.type} is not defined`);
        }
      });

    const result = [...lines]
      .filter(Boolean)
      .join('\n');

    return result;
  };

  return iter(tree, '');
};
