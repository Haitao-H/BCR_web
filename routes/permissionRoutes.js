// const roles = {
//     PUBLIC: 'public',
//     REGISTERED: 'registered',
//     BCR_MEMBER: 'bcr_member',
//     ADMINISTRATOR: 'administrator',
//   };

//   const permissions = {
//     SEARCH: 'search',
//     WATCH: 'watch',
//     UPLOAD: 'upload',
//     EDIT: 'edit',
//     DELETE: 'delete',
//   };

//   function checkPermission(permission) {
//     return (req, res, next) => {
//       const user = req.session.user; // Assuming user information is stored in the session

//       if (!user) {
//         return res.status(401).send('Unauthorized');
//       }

//       // Check if the user has the required permission
//       if (user.permissions.includes(permission)) {
//         next();
//       } else {
//         res.status(403).send('Forbidden');
//       }
//     };
//   }

//   // Example routes with middleware for authorization
//   app.get('/search', checkPermission(permissions.SEARCH), (req, res) => {
//     res.send('Performing search');
//   });

//   app.get('/watch', checkPermission(permissions.WATCH), (req, res) => {
//     res.send('Watching content');
//   });

//   app.post('/upload', checkPermission(permissions.UPLOAD), (req, res) => {
//     res.send('Uploading content');
//   });

//   app.put('/edit', checkPermission(permissions.EDIT), (req, res) => {
//     res.send('Editing content');
//   });

//   app.delete('/delete', checkPermission(permissions.DELETE), (req, res) => {
//     res.send('Deleting content');
//   });


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