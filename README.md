## Library Management System

###### Built using Node, Express, MongoDB

Initially, install the packages using `npm install`.

Run `nodemon index`.

Ensure that this code is running on port 3000.

#### Design specifics

The code is primarily split into 2 main folders, **routes** and **models**.

`index.js` is responsible for most of the middleware, setting up the database and the server.

#### Database modeling

I have decided to model **Authors** and **Books** as an M:N relationship, and the approach I have chosen is to store ids as foreign key references. The schema is well described in the model files. (works well with the mongo `.populate()` method)

#### Routes

All routes are generic GET, POST, PUT and DELETE that don't sway from their intended functionality.
All endpoints have been tested using **Postman**.


