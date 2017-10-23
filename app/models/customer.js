const sequelize = require('../../config/db')
const Sequelize = require('sequelize');
//const projectModel = require('./project');

const customerModel = {
    
    customer : sequelize.define('customer',{
        id : {
            type : Sequelize.INTEGER,
            primaryKey: true,
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
        company : {
            type : Sequelize.TEXT
        },
        skype : {
            type : Sequelize.TEXT
        },
        status : {
            type : Sequelize.INTEGER
        }
        },
        {
            freezeTableName: true,
            timestamps: true
        }),

    customer_access : sequelize.define('customer_access', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        customer_id : {
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

        customer_invitation : sequelize.define('customer_invitation',{
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        email : {
            type : Sequelize.TEXT
        },
        customer_id : {
            type : Sequelize.INTEGER
        },
            project_id : {
        type : Sequelize.INTEGER
        },
        token : {
            type : Sequelize.TEXT
        },
        company : {
            type : Sequelize.TEXT
        }
        },
        {
            freezeTableName: true,
            timestamps: false
        }),


        project_customer : sequelize.define('project_customer',{
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        project_id : {
            type : Sequelize.INTEGER
        },
        customer_id : {
            type : Sequelize.INTEGER
        }
        },
        {
            freezeTableName: true,
            timestamps: false
        })

}

// projectModel.project.belongsToMany(customerModel.customer, { through: customerModel.project_customer  });
// customerModel.customer.belongsToMany(projectModel.project, { through: customerModel.project_customer });


module.exports =  customerModel;