.PHONY: help build

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


init-npmrc:
	cp -n ./.npmrc.dist ./.npmrc

install: init-npmrc package.json ## Install dependencies
	yarn install

start: ## Run the project for development
	yarn start

build: ## Build the project for production
	yarn build

e2e-dev: ## Starts cypress
	yarn e2e-dev

e2e: ## Runs cypress
	yarn e2e

deploy: ## Build and push to gh-pages to publish the site
	yarn deploy
