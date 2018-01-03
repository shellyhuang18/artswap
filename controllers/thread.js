const express = require('express');
const models = require('../models');
const getSlug = require('speakingurl');
const multer = require('multer');
const path = require('path');


var file_image = '';
var storage = multer.diskStorage({
      destination: 'public/uploads',
      filename: function (req, file, cb) {
        file_image = file.fieldname + '-' + Date.now() + path.extname(file.originalname),
        cb(null, file_image)
      }            
    });

var upload = multer({ storage: storage }).single('uploadImage');


module.exports = {
  registerRouter() {
    const router = express.Router();

    router.get('/', this.index);
    router.get('/:id', this.display);
    router.post('/', this.create);

    router.post('/:id/add/:postid', this.addContributor);
    router.get('/:id/add/:postid', this.display);
    router.post('/:id', upload, this.createPost);

    //router.get('/edit/:slug', this.editThread);
    router.get('/edit/:id', this.edit);
    router.delete('/delete', this.remove);


    return router;
  },
  createPost(req, res){
    models.Post.create({
      UserId: req.user.id,
      ThreadId: req.params.id,
      body: req.body.info,
      image: '/uploads/'+file_image,
      creator: req.user.userName
    }).then((post) => {
      res.redirect(`/thread/${post.ThreadId}`);
    }).catch((err) => {
      if (err) {
        // An error occurred when uploading
        console.log("In createpost-------------------->");
        console.log(err);
      }else{
        res.json({msg: "working"})
      };
    });
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
          purposes: models.Thread.rawAttributes.purpose.values,
          layout: 'main'
        });
      });
  },



  // Allows user to create a thread
  create(req, res){
    models.Thread.create({
      slug: getSlug(req.body.title.toLowerCase()),
      title: req.body.title,
      description: req.body.description,
      difficulty: req.body.difficulty,
      purpose: req.body.purpose,
      creator: req.user.userName
    }).then((thread, err) => {
      models.Contributors.create({
        ThreadId: thread.id,
        UserId: thread.UserId,
        userName: thread.creator,
        threadTitle: thread.title
      }),
      res.redirect(`/thread/${thread.id}`);
    }).catch((err) => {
      console.log(err);
      res.render('threads/index')
    });
  },


  //Displays individual thread
  display(req, res){
    models.Thread.findOne({
      where: {
        id: req.params.id
      }
    }).then((thread) => {
       models.Post.findAll({
        where: {
          ThreadId: req.params.id
        }
      }).then((posts) => {
        const isCreator = (req.user.userName == thread.creator)
        res.render('threads/single', {isCreator, thread, posts})
      })
    }).catch((err) => {
      if (err) {
        // An error occurred when uploading
        console.log(err);
      }
      res.redirect('/thread')
    })

  },

  //Allows user to post a response to the thread

  // newResponse(req, res){
  //     models.Post.create({
  //       UserId: req.user.id,
  //       ThreadId: req.params.id,
  //       body: req.body.info
  //     }).then((post) => {
  //       res.redirect(`/thread/${post.ThreadId}`)
  //     }).catch(() => {
  //       res.json({
  //         msg: "no"
  //       })
  //     })
  // },
  


  addContributor(req,res){ //updates database
    //find thread model DONE
    //check if user is thread creator DONE
    //find post model DONE
    //update as highlighted DONE
    // use post model to find user DONE
    //Create the contributor
    //redirect back to thread
    let threadid = req.params.id
    let postid = req.params.postid
    models.Thread.findOne({where:{id: threadid}
    }).then(threadObj => {
      if(threadObj.creator != req.user.userName){ ///not the creator
        res.redirect(`/thread/${threadid}`)
      }
      else{
        models.Post.findOne({where:{id: postid}
      }).then(postObj => {

           postObj.updateAttributes({highlighted: true})
           models.User.findOne({where: {userName: postObj.creator}
         }).then(userObj => {
          if(userObj.userName == threadObj.creator){//post was by the creator of the thread
             res.redirect(`/thread/${threadid}`)          
          }
          else{
            models.Contributors.count({where:{
              ThreadId: threadid,
              UserId: userObj.id
            }}).then(count => {
            if(count != 0){
              res.redirect(`/thread/${threadid}`)
            }
            else{
             models.Contributors.create({
              ThreadId: threadid,
              UserId: userObj.id,
              userName: userObj.userName,
              threadTitle: threadObj.title
             })
             res.redirect(`/thread/${threadid}`)            
            }
        })
         }
       })


        })
      }
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
