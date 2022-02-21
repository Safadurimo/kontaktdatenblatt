BEGIN TRANSACTION;
INSERT INTO "marktpartner" VALUES (1,'EWE-Vertrieb','Herr Müller');
INSERT INTO "marktpartner" VALUES (2,'EWE-Netz','Herr Meier');
INSERT INTO "marktpartner" VALUES (3,'Westnetz','Herr Schulze');
INSERT INTO "nachrichten" VALUES (1,1645473890,'in',2,1,'{ "version": 1, "ansprechpartner": "Herr Müller" }');
COMMIT;
