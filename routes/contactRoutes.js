const express = require('express');
const routes = express.Router();
const { unreadMessage, refCode } = require('../dataModel');

routes.get('/', async (req, res) => {
    let jsonData = {}
    // is admin?
    if (req.session.user && req.session.user.level == refCode) {
        try {
            const messageList = await unreadMessage.find();
            jsonData.messageList = messageList;
            return res.render('contact', { title: 'Contact', jsonData })
        } catch (err) {
            console.error(err);
        }
    }
    res.render('contact', { title: 'Contact' })
});

routes.post('/submit', (req, res) => {
    const { name, email, subject, message } = req.body;
    const unread = new unreadMessage({
        name,
        email,
        subject,
        message
    })
    unread.save()
        .then(() => {
            console.log('Submitted Successfully!');
        }).catch((err) => {
            console.log('Error sending contact message...');
        })
    res.render('contact', {
        title: 'Contact',
        message: 'Submitted Successfully! We will reply to messages within 3-5 business days, thank you!'
    });
})

module.exports = routes;