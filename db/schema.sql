drop database burgers_db;
CREATE database burgers_db;

use burgers_db;
select * from burgers
select * from customers

SELECT `Burger`.`id`,SHOW INDEX FROM `Customers`
 `Burger`.`burger_name`, `Burger`.`devoured`, `Burger`.`customer_id`, `Burger`.`who_devoured_id`, `Burger`.`created_at`, `Burger`.`updated_at`, `Customer`.`id` AS `Customer.id`, `Customer`.`customer_name` AS `Customer.customer_name`, `Customer`.`created_at` AS `Customer.created_at`, `Customer`.`updated_at` AS `Customer.updated_at` FROM `Burgers` AS `Burger` LEFT OUTER JOIN `Customers` AS `Customer` ON `Burger`.`customer_id` = `Customer`.`id` ORDER BY `Burger`.`created_at` DESC LIMIT 10;
 
 
  SELECT customer.customer_name, count(burger.customer_id) AS likecount FROM Customers AS Customer, Burgers AS Burger where Customer.id = Burger.customer_id GROUP BY customer.customer_name HAVING (likecount > 0) ORDER BY likecount;
 
 
 
 SELECT Customers.id, Customers.customer_name, COUNT('Burgers.customer_id') AS BurgerCount FROM Customers LEFT OUTER JOIN Burgers ON Customers.id = Burgers.customer_id GROUP BY Customers.customer_name, Customers.id, Burgers.id;

 
 select customer_id from burgers where customer_id in (
 
 
 select * from burgers where  group_by customer_id 