const sequelize = require('../../config/db')
const Sequelize = require('sequelize');
const taskModel = {

    task :  sequelize.define('task',{
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        project_id : {
            type : Sequelize.INTEGER
        },
        title : {
            type : Sequelize.TEXT
        },
        description : {
            type : Sequelize.TEXT
        },
        stage : {
            type : Sequelize.TEXT
        },
        dificulty_level : {
            type : Sequelize.INTEGER
        },
        expiration : {
            type : Sequelize.DATE
        },
        status : {
            type : Sequelize.INTEGER
        },
        label : {
            type : Sequelize.TEXT
        },
        developer_id : {
            type : Sequelize.INTEGER
        },
        price : {
            type : Sequelize.REAL
        },
        points : {
            type : Sequelize.INTEGER
        }
        },
        {
            freezeTableName: true,
            timestamps: false
        }),

    task_comment: sequelize.define('task_comment',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    user_id : {
        type : Sequelize.INTEGER
    },
    type : {
        type : Sequelize.TEXT
    },
    comment : {
        type : Sequelize.TEXT
    },
    task_id : {
        type : Sequelize.INTEGER
    }
    },
    {
    freezeTableName: true,
    timestamps: false
    }),

    task_media: sequelize.define('task_media',{
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    path : {
        type : Sequelize.TEXT
    },
    description : {
        type : Sequelize.TEXT
    },
    task_id : {
        type : Sequelize.INTEGER
    },
    user_id : {
        type : Sequelize.INTEGER
    },
    type : {
        type : Sequelize.TEXT
    }
    },
    {
        freezeTableName: true,
        timestamps: false
    })


}

module.exports = taskModel;
