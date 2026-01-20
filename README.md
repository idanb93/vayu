# Vayu Home Assignment

## Requirements

- Have Docker installed on your machine.
- The following ports should be available: 3001(backend), 5433(database).

## Getting started:

Clone this repository:

```
cd https://github.com/idanb93/vayu.git
cd vayu
```

Initialize the application:

```
docker compose up
```

Usage:

```
Open Postman
```

Example Requests:

```
GET http://localhost:3001/get_all_users?limit=13&offset=5
GET http://localhost:3001/get_all_users?limit=10&offset=20
DELETE http://localhost:3001/delete_user_from_group?userId=1&groupId=1
```
