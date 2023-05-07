import { Router } from 'express';
import passport from 'passport'
const router = Router();

router.get('/verify', passport.authenticate('discord'), (req, res) => {

    if(req.user) {
      res.render('verify', {
        user: req.user
      })
    } else {
      res.redirect('/login')
    }
});


export default router;