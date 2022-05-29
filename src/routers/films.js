const express = require("express");
const router = express.Router();
let { films } = require("../../data.js");

router.get("/", (req, res) => {
  let filteredFilms = [];
  const queryArray = Object.entries(req.query);
  console.log("8...", req.query);
  console.log("9...", queryArray);
  // [
  //   [ 'director', 'Quentin Tarantino' ],
  //   [ 'title', 'Django Unchained' ]
  // ]
  // ? query ?
  if (queryArray.length !== 0) {
    queryArray.forEach((item) => {
      // director / title
      filteredFilms = films.filter((el) => el[item[0]] === req.query[item[0]]);
    });

    return res.json({ filteredFilms });
  }
  res.json({ films });
});

function check(res, req) {
  const idExists = films.some((film) => film.id === +req.params.id);
  if (!idExists) {
    return res.status(400).json({
      error: `film id: ${req.params.id} does not exist`,
    });
  }
}

router.get("/:id", (req, res) => {
  check(res, req);
  console.log(req.query);
  const film = films.find((film) => film.id === +req.params.id);

  res.json({ film });
});

router.post("/", (req, res) => {
  let id = films.length + 1;
  const film = { ...req.body, id };
  films.push(film);
  res.json({ film });
});

router.delete("/:id", (req, res) => {
  check(res, req);
  const film = films.find((film) => film.id === +req.params.id);
  films = films.filter((film) => film.id !== +req.params.id);
  res.json({ film });
});

router.put("/:id", (req, res) => {
  check(res, req);

  films = films.map((user) => {
    if (user.id === +req.params.id) {
      return { ...req.body, id: user.id };
    } else return user;
  });
  const film = films.find((films) => films.id === +req.params.id);
  res.json({ film });
});

router.patch("/:id", (req, res) => {
  check(res, req);

  const keys = Object.keys(req.body);
  let foundIndex = films.findIndex((film) => film.id === +req.params.id);
  keys.forEach((key) => {
    films[foundIndex][key] = req.body[key];
    console.log("76...", films[foundIndex]);
    console.log("77...", films[foundIndex][key]);
  });

  res.json({ ...films[foundIndex] });
});

module.exports = router;
