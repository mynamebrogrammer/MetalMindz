const router = require('express').Router();
const { Robot } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {



  try {
    const robotData = await Robot.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const robots = robotData.map((robot) => robot.get({ plain: true }));

    res.status(200).json(robots);
  } catch (err) {
    res.status(500).json(err);
    console.log("Unable to get robots");
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const robotData = await Robot.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    
    if (!robotData) {
      res.status(404).json({ message: 'No robot found with this id!' });
      return;
    }
    
    const robot = robotData.get({ plain: true });

    res.status(200).json(robot);
  } catch (err) {
    res.status(500).json(err);
  }
});

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
    const RobotData = await Robot.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!RobotData) {
      res.status(404).json({ message: 'No robot found with this id!' });
      return;
    }

    res.status(200).json(RobotData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
