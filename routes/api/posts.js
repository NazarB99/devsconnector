const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');

const validatePostInput = require('../../validation/post');

router.get('/test', (req, res) => res.json({msg: 'Posts Works'}));

router.get('/', (req, res) => {
    Post.find()
        .sort({date: -1})
        .then(posts => {
            res.json(posts)
        })
        .catch(err => console.log(err))
});

router.get('/:id', (req, res) => {
    Post.findOne({_id: req.params.id})
        .then(post => {
            res.json(post)
        })
        .catch(err => console.log(err))
});

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    }

    const newPost = new Post({
        user: req.user.id,
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
    });

    newPost.save().then(post => res.json(post));

});

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Post.findOne({_id: req.params.id})
        .then(post => {

            if (post.user.toString() !== req.user.id) {
                return res.status(401).json({nosuchprofile: 'Unauthorized!!!'})
            }

            post.remove().then(() => {
                return res.json({success: 'Post deleted'})
            })

        })
});

router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({alreadyliked: 'You already liked the post'})
                    }
                    post.likes.unshift({user: req.user.id});

                    post.save().then(post => res.json(post));
                })
        })
});

router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({noyetliked: 'You are not yet liked the post'})
                    }
                    const removeIndex = post.likes.map(item => item.user).indexOf(req.user.id);
                    post.likes.splice(removeIndex, 1);

                    post.save().then(post => res.json(post));
                });
        });
});

router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {errors, isValid} = validatePostInput(req.body);
    if (!isValid){
        return res.status(404).json(errors);
    }

    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text:req.body.text,
                name:req.body.name,
                avatar:req.body.avatar,
                user:req.body.user,
            };

            post.comments.unshift(newComment);
            post.save().then(post => res.json(post));
        })
});

router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req, res) => {

    Post.findById(req.params.id)
        .then(post => {

            if (post.comments.filter(item => item._id.toString() === req.params.comment_id).length === 0){
                return res.status(404).json({nocomment:'There is no comment to delete'})
            }

            const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);
            post.comments.splice(removeIndex,1);

            post.save().then(post => res.json(post));
        })
});

module.exports = router;