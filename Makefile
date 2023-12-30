include .env

all: up

install : clean up

#upd:down
#	docker compose up -d db
#	docker compose up app
up: down
	docker compose up -d
	@echo '${APP_NAME} : ${APP_PORT}'
down:
	docker compose down
clean:
	docker-compose down -v --rmi local



