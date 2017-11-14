const express = require('express');
const models = require('../models');
const getSlug = require('speakingurl');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.get('/:slug', this.display);
    router.post('/', this.create);
    router.post('/:slug', this.newResponse);
    router.put('/', this.edit);
    router.delete('/', this.remove);


    return router;
  },

  index(req, res){
    models.Thread.findAll({
      order: [[ 'createdAt', 'DESC']]
    })
      .then((threads) => {
        res.render('threads', {
          threads: threads,
          //all enum values
          difficulties: models.Thread.rawAttributes.difficulty.values,
          purposes: models.Thread.rawAttributes.purpose.values
        });
      });
  },



  // Allows user to create a thread
  create(req, res){
    models.Thread.create({
      userId: req.user.id,
      slug: getSlug(req.body.title.toLowerCase()),
      title: req.body.title,
      description: req.body.description,
      difficulty: req.body.difficulty,
      purpose: req.body.purpose
    }).then((thread) => {
      res.redirect(`/thread/${thread.slug}`);
    }).catch(() => {
      res.json({
        msg: "You fucked up"
      })
    });
  },


  //Displays individual thread
  display(req, res){
    models.Thread.findOne({
      where: {
        slug: req.params.slug
      },
    }).then((thread) => {
      res.render('threads/single', { thread })
    }).catch(() => {
      res.redirect('/thread')
    })
  },


  //Allows user to post a response to the thread
  newResponse(req, res){
    models.Thread.findOne({
      where:{ slug: req.params.slug },
    }),

    models.Post.create({
      UserId: req.user.id,
      body: req.body.info
    }).then((post) => {
      res.render('threads/single', { post })
    }).catch(() => {
      res.redirect('/')
    })
  },


  // Allows user to edit thread, iff thread belongs to user
  edit(req, res){

  },

  // Allows user to delete thread, iff thread belongs to user
  remove(req, res){

  }
};