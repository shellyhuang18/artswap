const express = require('express');
const fs = require('fs');
const path = require('path');
const Redirect = require('../middlewares/redirect');
const models = require('../models');

const router = express.Router();
const basename = path.basename(module.filename);

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    const fileName = file.substr(0, file.length - 3);
    router.use(`/${fileName}`, require(`./${fileName}`).registerRouter());
  });


router.get('/', (req, res) => { 
	if(req.user){
    models.Contributors.findAll({
      where: {UserId: req.user.id} 
    })

    .then(threadList => {
      let promisesA = []
      for(num in threadList){
        promisesA.push(
          models.Contributors.findAll({where: {ThreadId: threadList[num].ThreadId}})
          .then(threadContributors => {
            return threadContributors
          })
          )
      }
      return Promise.all(promisesA)
    })
    .then(projects =>{ //Now working with all the contributors to user's projects
      //This is a list of lists. Each thread is an entry, a list of contributors to it
      let promisesB = []
      for(list in projects){
          let socialPromises = []
          //console.log('LOOK OVER HERE', projects[list])
          socialPromises.push(projects[list][0].threadTitle) //Add threadtitle too
          for(user in projects[list]){
            if(projects[list][user].userName != req.user.userName){
            socialPromises.push(
              models.Social.findOne({where: {userName: projects[list][user].userName}})
              .then(userSocial => {
                return userSocial
              })
            )
          }
        }
          promisesB.push(Promise.all(socialPromises).then(ans => {return ans}))
      }
      return Promise.all(promisesB)
    }).then(userContacts => {
      res.render('home',{userContacts, layout: 'main' })
    })
	}
    else{
      res.render('splash', {layout: 'splash'});
    }
});

router.get('*', (req, res) => {
  res.status(404);
  res.render('404', {layout: '404'});
});



module.exports = router;
