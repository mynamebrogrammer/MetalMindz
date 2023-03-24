const router = require('express').Router();
const { Robot } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newRobot = await Robot.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRobot);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const robotData = await Robot.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!robotData) {
      res.status(404).json({ message: 'No robot found with this id!' });
      return;
    }

    res.status(200).json(robotData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
