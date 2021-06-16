--CREATE USERS
create table users
(
    id         serial                  not null
        constraint users_pk
            primary key,
    username   varchar(255)            not null,
    email      varchar(255)            not null,
    password   varchar(255)            not null,
    image_url  varchar(255),
    created_at timestamp default now() not null,
    updated_at timestamp default now() not null
);

alter table users
    owner to eqbuarubtngscp;

create unique index users_email_uindex
    on users (email);

create unique index users_username_uindex
    on users (username);


--CREATE OAUTH_TOKENS
create table oauth_tokens
(
    access_token             text      not null,
    id                       serial    not null
        constraint oauth_tokens_pk
            primary key,
    access_token_expires_on  timestamp not null,
    client_id                text      not null,
    refresh_token            text      not null,
    refresh_token_expires_on timestamp not null,
    user_id                  integer   not null
);

alter table oauth_tokens
    owner to eqbuarubtngscp;


--CREATE OAUTH_CLIENTS
create table oauth_clients
(
    client_id     text not null,
    client_secret text not null,
    redirect_uri  text not null,
    constraint oauth_clients_pk
        primary key (client_id, client_secret)
);

alter table oauth_clients
    owner to eqbuarubtngscp;