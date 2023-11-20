create database mycontacts;

create extension if not exists"uuid-ossp";

create table if not exists categories (
  id uuid not null unique default uuid_generate_v4(),
  name varchar not null
);

create table if not exists contacts (
  id uuid not null unique default uuid_generate_v4(),
  name varchar not null,
  email varchar unique,
  phone varchar,
  category_id uuid,
  foreign key(category_id) references categories(id)
);