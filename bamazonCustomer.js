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
	console.log("connected");
	storeFront()
	// start()
});

function storeFront(){
	var table;
	connection.query('SELECT * FROM products', function(err, results){
		if(err) throw err;

		var shopArray = [];

		for (var i = 0; i < results.length; i++){
			shopArray.push(results[i])
			
		table = new Table({
		head: ['ID', 'Product', 'Department', 'Price'],
		colWidths: [10, 30, 20, 10]
		});

			for (var j = 0; j < shopArray.length; j++){
				table.push(
				[shopArray[j].item_id, shopArray[j].product_name, shopArray[j].department_name, shopArray[j].price]
				);
			}
			
		}
	console.log(table.toString());
	})
	start()
}

function start(){
	connection.query('SELECT * FROM products', function(err, results){
	if(err) throw err;
	inquirer.prompt([
	{
		name: 'shopping',
		type: 'input',
		// choices: function(){
		// 	var choiceArray = [];
		// 	for(var i = 0; i < results.length; i++){
		// 		choiceArray.push(results[i].product_name);
		// 	}
		// 	return choiceArray;
		// },
		message: 'Please enter the Product ID for your purchase: '
	},
	{
		name: 'quantity',
		type: 'input',
		message: "How many would you like?"
	}
	])
	.then(function(answer){

		var chosenProduct;
		for(var i = 0; i < results.length; i++){
		if(results[i].item_id===parseInt(answer.shopping)){
			chosenProduct = results[i]
		}}

		console.log('Your cart: ' + chosenProduct.product_name + '\n' + 'Price: ' + chosenProduct.price)

		if(chosenProduct.stock_quantity > parseInt(answer.quantity)){

			var updatedStock = chosenProduct.stock_quantity - answer.quantity

			connection.query(
				'UPDATE products SET ? WHERE ?',
				[
					{
						stock_quantity: updatedStock
					},
					{
						item_id: chosenProduct.item_id
					}
				],
				function(err){
					if(err) throw err;
					console.log("Great, your order is on the way!");
					continueShopping();
				}
			);
		}
		else{
			console.log(chosenProduct.stock_quantity + 'that line')
			console.log(parseInt(answer.quantity))
			console.log("Sorry, looks like we're out...")
			continueShopping()
		}
	});
});
	
}

function continueShopping(){
	inquirer.prompt({
		name: 'keepShopping',
		type: 'list',
		message: 'Would you like to keep shopping?',
		choices: ['Yes', 'No']
	})
	.then(function(answer){
		if(answer.keepShopping.toUpperCase()==="YES"){
			storeFront()
		}
		else{
			console.log('Bye!')
			connection.end()
		}
	})
	
}