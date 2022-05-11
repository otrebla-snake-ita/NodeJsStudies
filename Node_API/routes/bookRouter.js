/* eslint-disable no-param-reassign */

const express = require('express');

function routes(Book) {
	const bookRouter = express.Router();
	bookRouter.route('/books')
		.post((req, res) => {
			const book = new Book(req.body);

			book.save();
			return res.status(201).json(book);
		})
		.get((req, res) => {
			//const response = { hello: 'This is my API' };
			//res.json(response);
			const query = {};
			if (req.query.genre) {
				query.genre = req.query.genre;
			}
			Book.find(query, (err, books) => {
				if (err) {
					return res.send(err);
				}
				return res.json(books);
			});
		});

	// configuring middleware, using only in this route with bookId. Next is a function used by the middleware to signal it's done with its processing and can pass
	// the request to the next thing. In this case it'll pass to .put(), but in case of more middlewares it passes to the next middleware.
	bookRouter.use('/books/:bookId', (req, res, next) => {
		Book.findById(req.params.bookId, (err, book) => {
			if (err) {
				return res.send(err);
			}
			if (book) {
				req.book = book;
				return next();
			}
			return res.sendStatus(404);
		});
	});

	bookRouter.route('/books/:bookId')
		.get((req, res) => res.json(req.book))
		.put((req, res) => {
			const { book } = req;
			book.title = req.body.title;
			book.author = req.body.author;
			book.genre = req.body.genre;
			book.read = req.body.read;
			req.book.save((err) => {
				if (err) {
					return res.send(err);
				}
				return res.json(book);
			});
		})
		.patch((req, res) => {
			const { book } = req;
			// eslint-disable-next-line no-underscore-dangle
			if (req.body._id) {
				// eslint-disable-next-line no-underscore-dangle
				delete req.body._id;
			}
			
			Object.entries(req.body).forEach((item) => {
				const key = item[0];
				const value = item[1];
				book[key] = value;
			});
			req.book.save((err) => {
				if (err) {
					return res.send(err);
				}
				return res.json(book);
			});
		})
		.delete((req, res) => {
			req.book.remove((err) => {
				if (err) {
					return res.send(err);
				}
				return res.sendStatus(204);
			});
		});
	return bookRouter;
}

module.exports = routes;