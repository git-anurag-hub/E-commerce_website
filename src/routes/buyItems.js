const Item = require("../models/items");
const express = require("express");
const router = new express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/user");

router.post("/api/cart/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const id = req.params.id;
    const product = { id, quantity: req.body.quantity || 1 };
    var existing = true;
    for (let item of user.cartProducts) {
      if (item.product[0].id === req.params.id) {
        item.product[0].quantity += parseInt(req.body.quantity || 1);
        existing = false;
      }
    }
    if (existing) {
      user.cartProducts.push({ product });
    }
    await user.save();
    res.status(201).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/api/cart", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    let items = [];
    for (let product of user.cartProducts) {
      let item = await Item.findById(product.product[0].id);
      if (item) {
        items.push({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          quantity: product.product[0].quantity,
        });
      }
    }
    res.send(items);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/api/cart/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    var items = user.cartProducts;
    var newCart = items.filter((item) => {
      return item.product[0].id !== req.params.id;
    });
    user.cartProducts = newCart;
    user.save();
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/api/cart/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const quantity = req.body.quantity;
    user.cartProducts.forEach((product) => {
      if (product.product[0].id === req.params.id) {
        product.product[0].quantity = quantity;
      }
    });
    user.save();
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/api/item/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).send("Item not found");
    }
    res.send(item);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
