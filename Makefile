.PHONY: test

build:
	docker-compose build
dc-test:
	docker-compose run app npm test
dc-shell:
	docker-compose run app sh
dc-lint:
	docker-compose run app ./node_modules/standard/bin/cmd.js
lint:
	./node_modules/standard/bin/cmd.js
	