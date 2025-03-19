import express from "express";
const app = express();

// ex 1
app.get("/greetings/:username", (req, res) => {
  res.send("Hello there, " + req.params.username + "!");
});

// ex 2
app.get("/roll/:number", (req, res) => {
  const num = Number(req.params.number);
  if (isNaN(num)) {
    console.log("hey");
    res.send("You must specify a number.");
  } else if (typeof Number(req.params.number) === "number") {
    console.log("bye");
    function getRandomNum(num) {
      return Math.floor(Math.random() * num);
    }
    const numberRolled = getRandomNum(Number(req.params.number));
    res.send("You rolled a " + numberRolled);
  }
});

// ex 3
app.get("/collectibles/:index", (req, res) => {
  const collectibles = [
    { name: "shiny ball", price: 5.95 },
    { name: "autographed picture of a dog", price: 10 },
    { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
  ];
  if (Number(req.params.index) > 2) {
    res.send("This item is no longer in stock. Check back soon!");
  } else {
    res.send(
      "The " +
        collectibles[Number(req.params.index)].name +
        " will be " +
        collectibles[Number(req.params.index)].price +
        "."
    );
  }
});

// ex 4
app.get("/shoes", (req, res) => {
  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" },
  ];
  
  const validShoes = [];
  function shoeCheck() {
    if (validShoes.length === 0) {
      res.send("There is no shoe like this.");
    } else {
      res.send(validShoes);
    }
  }

  if (
    !isNaN(Number(req.query.minPrice)) &&
    !isNaN(Number(req.query.maxPrice)) &&
    typeof req.query.type === "string"
  ) {
    for (let i = 0; i < shoes.length; i++) {
      //when all 3 queries are included
      if (
        shoes[i].price >= Number(req.query.minPrice) &&
        shoes[i].price <= Number(req.query.maxPrice) &&
        shoes[i].type === req.query.type
      ) {
        validShoes.push(shoes[i]);
      }
    }
    shoeCheck();
    //when only 2 querries are included
  } else if (
    !isNaN(Number(req.query.minPrice)) &&
    !isNaN(Number(req.query.maxPrice))
  ) {
    for (let i = 0; i < shoes.length; i++) {
      if (
        shoes[i].price >= Number(req.query.minPrice) &&
        shoes[i].price <= Number(req.query.maxPrice)
      ) {
        validShoes.push(shoes[i]);
      }
    }
    shoeCheck();
  } else if (
    !isNaN(Number(req.query.minPrice)) &&
    typeof req.query.type === "string"
  ) {
    for (let i = 0; i < shoes.length; i++) {
      if (
        shoes[i].price >= Number(req.query.minPrice) &&
        shoes[i].type === req.query.type
      ) {
        validShoes.push(shoes[i]);
      }
    }
    shoeCheck();
  } else if (
    !isNaN(Number(req.query.maxPrice)) &&
    typeof req.query.type === "string"
  ) {
    for (let i = 0; i < shoes.length; i++) {
      if (
        shoes[i].price <= Number(req.query.maxPrice) &&
        shoes[i].type === req.query.type
      ) {
        validShoes.push(shoes[i]);
      }
    }
    shoeCheck();
    //when only 1 querry is included
  } else if (!isNaN(Number(req.query.minPrice))) {
    for (let i = 0; i < shoes.length; i++) {
      if (shoes[i].price >= Number(req.query.minPrice)) {
        validShoes.push(shoes[i]);
      }
    }
    shoeCheck();
  } else if (!isNaN(Number(req.query.maxPrice))) {
    for (let i = 0; i < shoes.length; i++) {
      if (shoes[i].price <= Number(req.query.maxPrice)) {
        validShoes.push(shoes[i]);
      }
    }
    shoeCheck();
  } else if (typeof req.query.type === "string") {
    for (let i = 0; i < shoes.length; i++) {
      if (shoes[i].type === req.query.type) {
        validShoes.push(shoes[i]);
      }
    }
    shoeCheck();
  } else {
    res.send(shoes);
  }
});

app.listen(3000, () => {
  console.log("Express app is running on port 3000.");
});
