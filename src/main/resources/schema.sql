CREATE TABLE Ticket
(
    id         INTEGER AUTO_INCREMENT NOT NULL,
    movie      VARCHAR(255)           NOT NULL,
    amount     INTEGER                NOT NULL,
    first_name VARCHAR(255)           NOT NULL,
    last_name  VARCHAR(255)           NOT NULL,
    number   VARCHAR(255)           NOT NULL,
    email      VARCHAR(255)           NOT NULL,
    PRIMARY KEY (id)
);

