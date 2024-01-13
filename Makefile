include .env

all: up

install : clean up

dev:
	docker compose down app
	docker compose up -d db
up:
	docker compose up -d
	@echo '${APP_NAME} : ${APP_PORT}'
down:
	docker compose down
clean:
	docker-compose down -v --rmi local



