DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

create table products(
item_id INTEGER auto_increment NOT NULL,
product_name VARCHAR(100),
department_name VARCHAR(100),
price DECIMAL(10, 2)
stock_quantity INTEGER,

primary key (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Harry Potter', 'Books', 15.95, 300);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Toaster', 'Kitchen Wares', 34.50, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('white tees', 'Apparel', 5.49, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Coca-Cola', 'Food & Beverage', 10.79, 250);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Teddy Bear', 'Toys', 10, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('faded jeans', 'Apparel', 79.23, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('sweet tea', 'Food & Beverage', 5.45, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('White Christmas', 'Movies', 14.50, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('iPhone', 'Technology', 1000, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('500 Days of Summer', 'Movies', 20, 50);