
create table users
(
	id serial not null
		constraint users_pk
			primary key,
	username varchar(255) not null,
	email varchar(255) not null,
	password varchar(255) not null,
	image_url varchar(255)
);

create unique index users_email_uindex
	on users (email);

create unique index users_username_uindex
	on users (username);