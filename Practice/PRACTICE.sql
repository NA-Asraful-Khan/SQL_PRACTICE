
CREATE TABLE student (
    student_id INT AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL, -- This Column Cant be Empty
    -- major VARCHAR(20) UNIQUE, -- Unique Value in this ROW
    major VARCHAR(20) DEFAULT 'Undecided', -- Default Value in this Column
    PRIMARY KEY(student_id)
); --Create Table

-- *********** GET DATA *************--

SELECT * FROM student; -- Show All Table Data

SELECT name,major
FROM student 
WHERE major <> 'Biology' OR major = 'Comp Sci'
ORDER BY student_id DESC 
LIMIT 3; --Show Data Based On Requirement

SELECT *
FROM student 
WHERE name IN('Kate','Clair','Clay'); -- DIfferent Query Based On Requirement

-- *********** GET DATA END *************--

-- *********** CREATE DATA *************--

INSERT INTO student (name,major) VALUES('Jack', 'Biology'); -- Insert Data into Table
INSERT INTO student (name,major) VALUES('Kate', 'Sociology');
INSERT INTO student(name) VALUES('Clair'); -- Insert Selected Data into Table
INSERT INTO student VALUES(4,'Tom', 'Comp Sci'); -- IF not use AUTO_INCREMENT in student_id
INSERT INTO student VALUES(5,'Kate', 'Biology'); -- IF not use AUTO_INCREMENT in student_id

-- *********** CREATE DATA END*************--

-- *********** UPDATE DATA *************--

UPDATE student
SET name = 'Clay',major = 'Computer SCI' 
Where student_id = 9 ; --Update data in the selected ROW

-- *********** UPDATE DATA END *************--

-- *********** DELETE DATA *************--

DELETE FROM student --Delete All Row
WHERE student_id=5; --Delete Selected Row


-- *********** DELETE DATA END *************--



-- DESCRIBE student; --Show Table Structure

DROP TABLE student; --Delete Table

-- ALTER TABLE student ADD gpa DECIMAL(3,2); --ADD Column IN THE TABLE

-- ALTER TABLE student DROP COLUMN gpa; -- Delete Selected Column