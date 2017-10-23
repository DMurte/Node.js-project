const sequelize = require('../../config/db')
const Sequelize = require('sequelize');

const teamModel = {

    team : sequelize.define('team',{
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
            type : Sequelize.REAL,
        },
        type : {
            type : Sequelize.TEXT
        },
        profile_img : {
            type : Sequelize.TEXT
        },
        status : {
            type : Sequelize.INTEGER
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
        cv : {
            type : Sequelize.TEXT
        },
        description : {
            type : Sequelize.TEXT
        },
        projects_number : {
            type : Sequelize.INTEGER
        }
        },
        {
            freezeTableName: true,
            timestamps: false
        }),
    
    team_access : sequelize.define('team_access', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        collaborator_id : {
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
        }),
        
    project_team : sequelize.define('project_team',{
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        project_id : {
            type : Sequelize.INTEGER
        },
        collaborator_id : {
            type : Sequelize.INTEGER
        }
        },
        {
            freezeTableName: true,
            timestamps: false
        })


}

module.exports = teamModel;

