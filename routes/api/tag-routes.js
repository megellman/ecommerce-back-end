const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// find all tags
router.get('/', async (req, res) => {
  try{
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err){
    res.status(500).json(err);
    console.log(err);
  }
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });
    if(!tagData){
      res.status(404).json({message: 'Tag not found.'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try{
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch(err){
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try{
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if(!tagData){
      res.status(404).json({ message: 'Could not update. ID not found!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy ({
      where: {
        id: req.params.id,
      },
    });
    if(!tagData){
      res.status(404).json({message: 'No tag with that ID could be found.'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
