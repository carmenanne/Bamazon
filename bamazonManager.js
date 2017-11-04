var mysql = require('mysql')
var inquirer = require('inquirer')
var Table = require('cli-table')

var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'bamazon'
});

connection.connect(function(err){
	if(err) throw err;
	start()
});


function start(){
	inquirer.prompt({
		name: 'manager',
		type: 'list',
		message: 'What would you like to do today?',
		choices: ['Current Products', 'Low Inventory', 'Add to Inventory', '**New Product** \n']
	})
	.then(function(answer){
		if(answer.manager.toUpperCase()==="CURRENT PRODUCTS"){
			viewProducts()
		}
		else if(answer.manager==="Low Inventory"){
			lowInventory()
		}
		else if(answer.manager==="Add to Inventory"){
			addInventory()
		}
		else if(answer.manager==="**New Product** \n"){
			newProduct()
		}
		else{
			throw err
		}
	})
}

function viewProducts(){
	var table;
	connection.query('SELECT * FROM products', function(err, results){
		// console.log("CURRENT PRODUCTS:")
		if(err) throw err;

		var shopArray = [];

		for (var i = 0; i < results.length; i++){
			shopArray.push(results[i])
			
		table = new Table({
		head: ['ID', 'Product', 'Department', 'Price', 'Units'],
		colWidths: [10, 30, 20, 10, 10]
		});

			for (var j = 0; j < shopArray.length; j++){
				table.push(
				[shopArray[j].item_id, shopArray[j].product_name, shopArray[j].department_name, shopArray[j].price, shopArray[j].stock_quantity]
				);
			}
			
		}
	console.log(table.toString());
	})
	connection.end()
}

function lowInventory(){
	connection.query('SELECT * FROM products', function(err, results){
		if(err) throw err;

		var lowStock = []

		for (var i = 0; i < results.length; i++){
			if (results[i].stock_quantity <= 60){
				lowStock.push(results[i])				
			}
		}
		for (var j = 0; j < lowStock.length; j++)
		console.log(lowStock[j].product_name + ' || ' + lowStock[j].stock_quantity)

	})


	connection.end()
}

function addInventory(){
	connection.query('SELECT * FROM products', function(err, results){
		if(err) throw err;
		inquirer.prompt([
		{
			name: 'addProduct',
			type: 'list',
			message: 'Please select the product you would like to add to:',
			choices: function(){
				return results.map(function(result){
					return result.product_name
				})
			}
		}
		])
		.then(function(answer){

			var chosenItem = results.find(function(product){
				return product.product_name === answer.addProduct
				
			})
			console.log(chosenItem.product_name)
			inquirer.prompt([
				{
					name: 'addStock',
					type: 'input',
					message: 'How many units would you like to add to ' + chosenItem.product_name + '?'
				}
				])
				.then(function(answer){
					// console.log(answer.addStock)
					var addToStock = chosenItem.stock_quantity + parseInt(answer.addStock)
					// console.log(addToStock)
					connection.query(
					'UPDATE products SET? WHERE?',
					[
						{
							stock_quantity: addToStock
						},
						{
							product_name: chosenItem.product_name
						}
					],
					function(err, res){
						if(err) throw err
						console.log("Stock updated!")
					}
					);
					connection.end()
				})
		})
	})
	// connection.end()
}

function newProduct(){

	inquirer.prompt([
	{
		name: 'addNew',
		type: 'input',
		message: 'Please enter the name of the new product to be added:'
	},
	{
		name: 'deparment',
		type: 'input',
		message: 'What department does this product belong to?'
	},
	{
		name: 'customerCost',
		type: 'input',
		message: 'How much will the item cost per unit to the customer?'
	},
	{
		name: 'quantity',
		type: 'input',
		message: 'How many units will we have in stock to begin?'
	}
		])
		.then(function(answer){
			connection.query(
				'INSERT INTO products SET?',
				{
					product_name: answer.addNew,
					department_name: answer.deparment,
					price: answer.customerCost,
					stock_quantity: answer.quantity
				},
				function(err){
					if(err) throw err;
					console.log('Product successfully added to inventory.');
					connection.end()
				}
				
				);
		});

}