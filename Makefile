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