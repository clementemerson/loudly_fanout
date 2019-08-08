//mongo
var mongodb = require('./mongo').getDbConnection;
var dbtables = require('./dbtables');

module.exports = {
    //-------------------------------------------------------------------------
    getOneByPhoneNumber: async (phonenumber) => {
        console.log('db.users.getOneByPhoneNumber');
        let users = await mongodb().collection(dbtables.Users)
            .find({ phonenumber: phonenumber })
            .toArray();
        return users[0];
    },
};
