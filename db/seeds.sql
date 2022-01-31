INSERT INTO
  department (id, name)
VALUES(1, "Command"),
  (2, "Engineering"),
  (3, "Sience"),
  (4, "Operatios"),
  (5, "Communications");
 
INSERT INTO
  role (id, title, salary, department_id)
VALUES(1, "Captain", 250000, 1),
  (2, "Second officer", 180000, 1),
  (3, "Captain of engineering", 150000, 2),
  (4, "Assistant chief engineer", 120000, 2),
  (5, "Chief science officer", 160000, 3),
  (6, "Science officer", 125000, 3),
  (7, "Chief operations officer", 150000, 4),
  (8, "Communications Officer", 190000, 5);

INSERT INTO
  employee (id, first_name, last_name, role_id, manager_id)
 VALUES(1, "Jean-Luc", "Picard", 1, NULL),
  (2, "Montgomery", "Scott", 1, 1),
  (3, "Geordi", "La Forge", 2, NULL),
  (4, "B'Elanna", "Torres", 2, 3),
  (5, "S'chn T'gai", "Spock",  3, NULL),
  (6, "Jadzia", "Dax", 3, 5),
  (7, "Data", "", 4, NULL),
  (8, "Nyota", "Uhura", 5, NULL);


