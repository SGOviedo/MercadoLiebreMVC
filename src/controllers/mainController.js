const db = require("../database/models");

const { loadProducts } = require("../data/dbModule");
const { Op } = require("sequelize");

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		// Do the magic
		let productsInsale = db.Product.findAll({
			where: {
				discount: {
					[Op.gte]: 12,
				},
			},
			limit: 4,
			order: [["discount", "DESC"]],
			attributes: {
				exclude: ["createdAt", "updatedAt", "categoryId"],
			},
			include: [
				{
					association: "category",
					attributes: ["id", "name"],
				},
				{
					association: "images",
				},
			],
		});
		let productsVisited = db.Product.findAll({
			order: [["createdAt", "DESC"]],
			limit: 4,
			attributes: {
				exclude: ["updatedAt", "categoryId"],
			},
			include: [
				{
					association: "category",
					attributes: ["id", "name"],
				},
				{
					association: "images",
				},
			],
		});

		Promise.all([productsInsale, productsVisited])
			.then(([productsInSale, productsVisited]) => {
				return res.render("index", {
					productsVisited,
					productsInSale,
					toThousand,
				});
			})
			.catch((error) => console.log(error));
	},
	search: (req, res) => {
		// Do the magic
		let { keywords } = req.query;

		db.Product.findAll({
			where: {
				[Op.or]: [
					{
						name: {
							[Op.substring]: keywords,
						},
					},
					{
						description: {
							[Op.substring]: keywords,
						},
					},
				],
			},
			include: ["images"],
		})
			.then((result) => {
				return res.render("results", {
					result,
					toThousand,
					keywords,
				});
			})
			.catch((error) => console.log(error));
	},
};

module.exports = controller;
