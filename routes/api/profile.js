const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

router.get('/test', (req, res) => res.json({msg: 'Profile Works'}));

router.get('/all', (req, res) => {
    const errors = {};
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofiles = 'No profiles';
                return res.status(404).json(errors)
            }
            else {
                return res.json(profiles)
            }
        })
});

router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({handle: req.params.handle})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile with this handle';
                return res.status(404).json(errors)
            }
            return res.json(profile);
        })
});

router.get('/user/:user', (req, res) => {
    const errors = {};
    Profile.findOne({user: req.params.user})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile with this id';
                return res.status(404).json(errors)
            }
            return res.json(profile);
        })
});

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};

    Profile.findOne({user: req.user.id})
        .populate('user', ['name', 'email'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile';
                return res.status(404).json(errors)
            }
            return res.json(profile);
        })

});

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validateProfileInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }

    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    Profile.findOne({user: req.user.id}).then(profile => {
        if (profile) {
            Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new: true}).then(profile => res.json(profile))
        }
        else {
            Profile.findOne({handle: req.body.handle}).then(profile => {
                if (profile) {
                    errors.handle = 'This handle already exists';
                    res.status(400).json(errors)
                }
                else {
                    new Profile(profileFields).save().then(profile => res.json(profile));
                }
            })
        }
    })

});

router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {errors, isValid} = validateExperienceInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({user: req.user.id})
        .then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description,
            };

            profile.experience.unshift(newExp);

            profile.save().then(profile => res.json(profile))
        })

});

router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {

    const {errors, isValid} = validateEducationInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({user: req.user.id})
        .then(profile => {
            const newEdu = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description,
            };

            profile.education.unshift(newEdu);

            profile.save().then(profile => res.json(profile))
        })

});

router.delete('/experience/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.id);

            profile.experience.splice(removeIndex, 1);
            profile.save().then(profile => res.json(profile));
        })
});

router.delete('/education/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            const removeIndex = profile.education.map(item => item.id).indexOf(req.params.id);

            profile.education.splice(removeIndex, 1);
            profile.save().then(profile => res.json(profile));
        })
});

router.delete('/delete', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOneAndRemove({user: req.user.id})
        .then(() => {
            User.findOneAndRemove({_id: req.user.id})
                .then(() => {
                    res.json({success:'User and profile deleted'})
                })
        });
});

module.exports = router;