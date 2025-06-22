const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.post('/', async (req, res) => {
  try {
    const { name, type, description, coverImage, additionalImages } = req.body;

    const newItem = new Item({
      name,
      type,
      description,
      coverImage,
      additionalImages
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add item' });
  }
});


router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

router.delete('/:id',async(req,res)=>{
  try {
    const deleted= await Item.findByIdAndDelete(req.params.id);
    if(!deleted){
      return res.status(404).json({message:'Item not found'})
    }
    res.status(200).json({message:"Item deleted successfully"})
  } catch (error) {
    res.status(500).json({error:'Failed to delete item'})
  }
});

module.exports = router;
