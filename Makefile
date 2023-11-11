include .env

all: up

install : clean up

up:down
	docker compose up -d db
	docker compose up app
#up:
#	docker compose up -d
clean:
	docker-compose down -v --rmi all
down:
	docker compose down
