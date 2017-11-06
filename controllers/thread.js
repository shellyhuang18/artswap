const express = require('express');
const models = require('../models');
const getSlug = require('speakingurl');

module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.get('/:slug', this.display);
    router.post('/', this.create);
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
          threads: threads
        });
      });
  },



  // Allows user to post a response, iff thread doesn't belong to user
  create(req, res){
    // req.user.createPost({
    //   title: "fffff",
    //   description: "pppppp",
    //   difficulty:"Beginner",
    //   purpose: "Collab"
    // }).then((post) => {
    //   res.render('home');
    // }).catch(() => {
    //   res.json({
    //     msg: models.Thread.rawAttributes.difficulty.values[0] 
    //   })
      
    // }) 


    models.Thread.create({
      userId: req.user.id,
      slug: getSlug(req.body.title.toLowerCase()),
      title: req.body.title,
      description: req.body.description,
      difficulty: "Beginner",
      purpose: "Collab"
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

    // models.Thread.findOne({
    //   where: { 
    //     slug: req.params.slug
    //   },
    //   include: [{ 
    //     model: models.Thread 
    //   }],
    // }).then((thread) => {
    //   res.render('threads/single', { thread })
    // }).catch(() => {
    //   res.redirect('/thread')
    // })
  },


  // Allows user to edit thread, iff thread belongs to user
  edit(req, res){

  },

  // Allows user to delete thread, iff thread belongs to user
  remove(req, res){

  }
};