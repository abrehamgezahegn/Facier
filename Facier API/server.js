const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const database = {
	users: [
		{
			id: "123",
			name: "molloya",
			email: "moll",
			password: "fuu",
			entries: 0,
			joined: new Date()
		},

		{
			id: "124",
			name: "metregi",
			email: "metregia@madbet.com",
			password: "swoooop",
			entries: 0,
			joined: new Date()
		}
	]
};

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send(database.users);
});

app.post("/signin", (req, res) => {
	if (
		req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password
	) {
		res.json(database.users[0]);
	} else {
		res.status(400).json("error");
	}
});

app.post("/register", (req, res) => {
	const { name, email, password } = req.body;
	database.users.push({
		id: "125",
		name: name,
		email: email,
		entries: 0,
		joined: new Date()
	});
	res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (id === user.id) {
			found = true;
			return res.json(user);
		}
	});
	if (!found) {
		return res.status(404).json("user not found");
	}
});

app.put("/image", (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (id === user.id) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	});
	if (!found) {
		return res.status(404).json("user not found");
	}
});

app.listen(3000, () => {
	console.log("app is running in port 3000");
});
