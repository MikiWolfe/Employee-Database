INSERT INTO
  department (name)
VALUES( "Command"),
  ("Engineering"),
  ("Sience"),
  ("Operatios"),
  ("Communications");
 
INSERT INTO
  role (title, salary, department_id)
VALUES("Captain", 250000, 1),
  ("Second officer", 180000, 1),
  ("Captain of engineering", 150000, 2),
  ("Assistant chief engineer", 120000, 2),
  ("Chief science officer", 160000, 3),
  ("Science officer", 125000, 3),
  ("Chief operations officer", 150000, 4),
  ("Communications Officer", 190000, 5);

INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
 VALUES("Jean-Luc", "Picard", 1, NULL),
  ("Montgomery", "Scott", 1, 1),
  ("Geordi", "La Forge", 2, NULL),
  ("B'Elanna", "Torres", 2, 3),
  ("S'chn T'gai", "Spock",  3, NULL),
  ("Jadzia", "Dax", 3, 5),
  ("Data", "", 4, NULL),
  ("Nyota", "Uhura", 5, NULL);


