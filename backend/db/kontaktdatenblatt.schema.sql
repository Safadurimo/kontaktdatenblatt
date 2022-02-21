BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "marktpartner" (
	"id"	INTEGER NOT NULL UNIQUE,
	"name"	TEXT,
	"ansprechpartner"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "nachrichten" (
	"id"	INTEGER,
	"timestamp" integer,
	"richtung"	TEXT,
	"sender"	INTEGER,
	"empfaenger"	empfaenger,
	"nachricht"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY(sender) REFERENCES marktpartner(id),
	FOREIGN KEY(empfaenger) REFERENCES marktpartner(id)
);
COMMIT;
