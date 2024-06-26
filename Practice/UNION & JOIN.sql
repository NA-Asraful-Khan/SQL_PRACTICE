
-- Find a list of employee and branch names
SELECT employee.first_name AS Employee_Branch_Names
FROM employee
UNION
SELECT branch.branch_name
FROM branch;

-- Find a list of all clients & branch suppliers' names
SELECT client.client_name as CLIENT, client.branch_id as BRANCH_ID
FROM client
UNION
SELECT branch_supplier.supplier_name, branch_supplier.branch_id
FROM branch_supplier;


-- Add the extra branch
INSERT INTO branch VALUES(4, "Buffalo", NULL, NULL);

SELECT employee.emp_id, employee.first_name, branch.branch_name
FROM employee
RIGHT JOIN branch    -- LEFT JOIN, RIGHT JOIN
ON employee.emp_id = branch.mgr_id;

SELECT employee.emp_id, employee.first_name, employee.last_name, SUM(works_with.total_sales) AS total_sales
FROM employee
INNER JOIN works_with
  ON employee.emp_id = works_with.emp_id
WHERE works_with.total_sales > 30000
GROUP BY employee.emp_id, employee.first_name, employee.last_name;

