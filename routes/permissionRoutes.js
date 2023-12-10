const express = require('express');
const router = express.Router();
const { bcrData, unreadMessage } = require('../dataModel');

// delete media request
router.post('/media/:objId', (req, res) => {
    const objId = req.params.objId;
    bcrData.deleteOne({ _id: objId })
        .then(function () {
            console.log(`media id: ${objId} deleted`);
            res.redirect('/media');
        }).catch(function (error) {
            console.log(error);
        });
});

// delete unread message request
router.post('/unreadMessage/:objId', (req, res) => {
    const objId = req.params.objId;
    unreadMessage.deleteOne({ _id: objId })
        .then(function () {
            console.log(`unread message id: ${objId} deleted`);
            res.redirect('/contact');
        }).catch(function (error) {
            console.log(error);
        });
});


module.exports = router;