create table users
(
  userid text not null,
  email text unique not null,
  password text not null
); 