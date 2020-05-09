const express = require('express');
const router = express.Router();
const Members = require('../../Members');
const uuid = require('uuid');

//get all members
router.get('/', (req, res) => {
  res.json(Members);
});

//get single member
router.get('/:id', (req, res) => {
  //check if member with id exists. 'some' returns true or false
  let found = Members.some((member) => member.id == req.params.id);

  if (found) {
    res.json(Members.filter((member) => member.id == req.params.id));
  } else {
    res.status(400).json({ msg: `no member with id ${req.params.id} found` });
  }
});

//create a member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active',
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({ msg: 'Please include a name and email' });
  }

  Members.push(newMember);

  res.json(Members);
});

//update member
router.put('/:id', (req, res) => {
  // check if member with id exists. 'some' returns true or false
  let found = Members.some((member) => member.id == req.params.id);

  if (found) {
    const updatedMember = req.body;
    Members.forEach((member) => {
      if (member.id == req.params.id) {
        member.name = updatedMember.name ? updatedMember.name : member.name;
        member.email = updatedMember.email ? updatedMember.email : member.email;

        res.json({ msg: 'Member updated', member: member });
      }
    });
  } else {
    res.status(400).json({ msg: `no member with id ${req.params.id} found` });
  }
});

router.delete('/:id', (req, res) => {
  //check if member with id exists. 'some' returns true or false
  let found = Members.some((member) => member.id == req.params.id);

  if (found) {
    res.json({
      msg: 'member deleted',
      members: Members.filter((member) => member.id != req.params.id),
    });
  } else {
    res.status(400).json({ msg: `no member with id ${req.params.id} found` });
  }
});

module.exports = router;
