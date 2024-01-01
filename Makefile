include .env

all: up

install : clean up

dev:down
	docker compose up -d db
	npm run dev
up: down
	docker compose up -d
	@echo '${APP_NAME} : ${APP_PORT}'
down:
	docker compose down
clean:
	docker-compose down -v --rmi local



