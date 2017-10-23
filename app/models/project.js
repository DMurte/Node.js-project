const sequelize = require('../../config/db')
const Sequelize = require('sequelize');
const projectModel = {

project : sequelize.define('project',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    title : {
        type : Sequelize.TEXT 
    },
    subtitle : {
        type : Sequelize.TEXT
    },
    budget : {
        type : Sequelize.REAL
    },
    estimated_time : {
        type : Sequelize.REAL,
    },
    pm_id : {
        type : Sequelize.INTEGER
    },
    tech_description : {
        type : Sequelize.TEXT
    },
    repo_url : {
        type : Sequelize.TEXT
    },
    status : {
        type : Sequelize.INTEGER
    },
    stage : {
        type : Sequelize.TEXT
    },
    description : {
        type : Sequelize.TEXT
    }
    },
    {
        freezeTableName: true,
        timestamps: false
    }),

    project_media : sequelize.define('project_media',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    project_id : {
        type : Sequelize.INTEGER
    },
    path : {
        type : Sequelize.TEXT
    },
    type : {
        type : Sequelize.TEXT
    },
    description : {
        type : Sequelize.TEXT
    },
    user_id : {
        type : Sequelize.INTEGER
    },
    user_type : {
        type : Sequelize.TEXT
    }
    },
    {
        freezeTableName: true,
        timestamps: false
    })
}

module.exports = projectModel;
