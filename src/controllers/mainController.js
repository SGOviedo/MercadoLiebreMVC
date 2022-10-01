const {loadProducts} =require('../data/dbModule')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		// Do the magic
		let products = loadProducts();
		let productsVisited = products.filter(product => product.category === "visited");
		let productsInSale = products.filter(product => product.category === "in-sale");

		return res.render('index', {
			productsVisited,
			productsInSale,
			toThousand
		})
	},
	search: (req, res) => {
		// Do the magic
		let {keywords} = req.query;
		let products = loadProducts();
		let result = products.filter(product => product.name.toLowerCase().includes(keywords.toLowerCase()));
		return res.render('results',{
			result,
			toThousand,
			keywords
		})
	},
};

module.exports = controller;
