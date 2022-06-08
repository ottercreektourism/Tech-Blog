const router = require('express').Router();
const { Blogpost } = require('../../models');
const withAuth = require('../../utils/auth');



router.post('/', withAuth, async (req, res) => {
    try {
      console.log("activated==================================================");
        const newBlogpost = await Blogpost.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newBlogpost);
    } catch (err) {
        res.status(400).json(err);
    }
});



router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedBlogpost = await Blogpost.update(
            req.body,
            {
                where: { id: req.params.id }

            });
        res.status(200).json(updatedBlogpost);
    } catch (err) {
        res.status(400).json(err);
    }
})


// Deletes the project where the id is specified

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogpostData = await Blogpost.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogpostData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
