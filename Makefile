install:
	npm ci
link:
	npm link
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