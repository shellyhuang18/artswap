const express = require('express');
const models = require('../models');
const getSlug = require('speakingurl');

module.exports = {
  registerRouter() {
    const router = express.Router();
    router.get('/', this.index);
    router.get('/:slug', this.display);
    router.post('/:slug', this.newResponse);
    router.post('/', this.create);
    
    //router.get('/edit/:slug', this.editThread);
    router.get('/edit/:slug', this.edit);
    router.delete('/delete', this.remove);

    return router;
  },

  index(req, res){
    models.Thread.findAll({
      order: [[ 'createdAt', 'DESC']]
    })
      .then((threads) => {
        res.render('threads', {
          threads: threads,
          difficulties: models.Thread.rawAttributes.difficulty.values,
          purposes: models.Thread.rawAttributes.purpose.values
        });
      });
  },
  
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
    }).then((posts) => {
      res.render('threads/single', { thread, posts })
    }).catch(() => {
      res.redirect('/thread')
    })


  },

  //Allows user to post a response to the thread
  newResponse(req, res){
      models.Post.create({
        UserId: req.user.id,
        ThreadId: req.params.slug,
        body: req.body.info
      }).then((post) => {
        res.redirect(`/thread/${post.ThreadId}`)
      }).catch(() => {
        res.redirect('/thread')
      })

  },


  // Allows user to edit thread, iff thread belongs to user
  edit(req, res){
    res.render('/threads/update')
    // models.Thread.update({
    //   title: req.body.title,
    //   desription: req.body.description
    // },
    // {
    //   where: {
    //    slug: req.params.slug
    //   }
    // }).then(() => {
    //   res.render('threads/update')
    // }).catch(() => {
    //   res.redirect('/thread')
    // });
  },

  // editThread(req, res){

  //   res.render('/threads/update/')
  // }

  // Allows user to delete thread, iff thread belongs to user
  remove(req, res){
  }

};
