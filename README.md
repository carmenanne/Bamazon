# Bamazon App
This is a CLI application which functions like an online storefront. With two different features, the user can act as a ‘customer’, where they can view all available items and make purchases; or ‘manager’, where they will be able to view available inventory for all products, search for which items are low inventory, add inventory to any available products, and add entirely new products to the store options.

## Getting Started
Since this app requires MySQL, you will need to make sure that package is installed on your computer first. Windows users can use MySQL Workbench and Mac users can use Sequel Pro.
* Windows Installation:
[Instalation for Windows](https://dev.mysql.com/downloads/installer/)
* Mac Installation:
follow the following instructions:
    brew install mysql

Once installed, you can use the schema.sql folder to create your database in MySQL. You’ll need to set this up in order for any future code to work properly.


This is a Node-based application designed to run in your terminal. You will need the node library installed as well as the following npm packages in order to get the app features to work in Node.js:

*Node.js library installation

  -[Windows link](https://nodejs.org/en/)

  -Mac:
    brew install node

    npm install inquirer
    npm install mysql
    npm install cli-table


### Customer View
From the customer view in the terminal a user will be able to do the following:

View a list of current products for sale:

(image screenshot)

2.Choose a product to purchase and the amount they desire:

(GIF link)

If there is enough product in stock to complete the user’s order, the order will go through and display the total cost to the customer.

(GIF link)

If there is not enough of the product, the store will bounce back with a message explaining there is not enough.

(GIF link)

From there, it will prompt the user if they wish to continue shopping or finish, at which point it will return them to the opening prompt or end the application.

(screenshot)

### Manager View
As a manager, the user will first be prompted with a list of options to choose from, that will then allow the user to complete different actions within the store:
(img screenshot)
 
*View Products:

(img screenshot)

*Low Inventory:

(img screenshot)

*Add to Inventory:

(GIF link)

*Add New Product:

(GIF link)

Once the selection has been made it will prompt the manager if they wish to return to the home menu or exit the program, at which point it will either return the beginning list options, or exit the application.

(img screenshot)

## Author
Carmen Stockberger - (github link)

Cheers!
