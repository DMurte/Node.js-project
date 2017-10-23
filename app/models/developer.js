const sequelize = require('../../config/db')
const Sequelize = require('sequelize');

const developerModel = {

    developer : sequelize.define('developer',{
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        first_name : {
            type : Sequelize.TEXT
        },
        last_name : {
            type : Sequelize.TEXT
        },
        email : {
            type : Sequelize.TEXT
        },
        password : {
            type : Sequelize.TEXT
        },
        profile_img : {
            type : Sequelize.TEXT
        },
        level : {
            type : Sequelize.TEXT
        },
        cellphone : {
            type : Sequelize.TEXT
        },
        skype : {
            type : Sequelize.TEXT
        },
        country : {
            type : Sequelize.TEXT
        },
        city : {
            type : Sequelize.TEXT
        },
        github : {
            type : Sequelize.TEXT
        },
        cv : {
            type : Sequelize.TEXT
        },
        description : {
            type : Sequelize.TEXT
        },
        linkedin : {
            type : Sequelize.TEXT
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }),

    developer_access : sequelize.define('developer_access', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        developer_id : {
            type : Sequelize.INTEGER
        },
        access_token : {
            type : Sequelize.TEXT
        },
        createdAt :{
            type : Sequelize.DATE
        },
        updatedAt :{
            type : Sequelize.DATE
        }
    },
    {
        freezeTableName: true,
        timestamps: true
    })

}

module.exports = developerModel;

