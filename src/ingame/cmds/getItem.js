const { items, npcs } = require('mongoose/models');
const passport = require('passport');

function main(req, res, para)
{
    npcs.getNPC('ItemShop').then(result => {
        console.log(result);
        res.json(result);
    }).catch(err => {
        console.log(err);
    });
}

COMMUNICATE_D.registerCmd('getNPC', main);