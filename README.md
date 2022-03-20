# auth-tasks
An authentication backend code which also provides basic functionality to perform CRUD ops on a task model.

## Requirements
For development, you will need the following:

- ### Node
  - Follow this link for installation https://www.npmjs.com/package/node
- ### Yarn or npm (I prefer yarn)
  - Follow either of these for installation
  - https://www.npmjs.com/package/yarn or https://www.npmjs.com/package/npm
- ### Postgres
  - Follow this link for installation https://www.postgresql.org/download/

## Install

- Install all dependecies mentioned in the package.json file
  - git clone https://github.com/musfir-tariq/auth-tasks
  - cd auth-tasks
  - Run 'yarn install' in terminal. It should install all the dependencies.

## Configure app

- Create a .env file considering the .env.sample file. You will need to add the environment variables.
- Create database using the following command on a mac
  - psql -c 'create database my_db;'
  - For linux, you can use the following command
    - sudo -u postgres psql -c 'create database my_db;'
- For adding seeders just add the seeders.up() method from src/seeders into main.ts to add seeders once.
  ##### Note that the db name specified here and in the .env must be the same.



