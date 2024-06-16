# Description

Simple Library API is a simple RESTFUL API for managing book data created using expressJS.

## Requirements

- NodeJS
- MySQL

## Usage

- Clone the repository

```
git clone https://github.com/mstkm/simple-library-api.git
```

- Set env
- Create database with name 'library'
- Run the app

```
node server.js
```

## Routes

| Method | Route | Description |
| --- | --- | --- |
| POST | /api/users/register | Registration |
| POST | /api/users/login | Login |
| POST | /api/books | Add a book |
| GET | /api/books | Get all books |
| GET | /api/books/:id | Get a book |
| PUT | /api/books/:id | Update a book |
| DELETE | /api/books/:id | Delete a book |
