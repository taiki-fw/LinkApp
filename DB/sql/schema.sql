CREATE TABLE users(
  user_id TEXT NOT NULL PRIMARY KEY,
  email TEXT unique NOT NULL,
  password TEXT NOT NULL
); 

CREATE TABLE link_cards(
  id serial PRIMARY KEY,
  title TEXT NOT NULL,
  comment TEXT,
  url TEXT NOT NULL,
  user_id TEXT NOT NULL references users(user_id)
);