include .env

all: up

install : clean up

#upd:down
#	docker compose up -d db
#	docker compose up app
up: down
	docker compose up -d
down:
	docker compose down
clean:
	docker-compose down -v --rmi local

