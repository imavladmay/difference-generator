install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
tests:
	npm test
test-coverage:
	npm test -- --coverage
rec:
	asciinema rec
plain:
	gendiff -f plain __fixtures__/file1.json __fixtures__/file2.json
stylish:
	gendiff -f stylish __fixtures__/file1.json __fixtures__/file2.json
json:
	gendiff -f json __fixtures__/file1.json __fixtures__/file2.json