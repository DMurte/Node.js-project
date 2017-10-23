const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const customerModel = require('../models/customer');
const teamModel = require('../models/team');
const developerModel = require('../models/developer');
const projectModel = require('../models/project');

const auth = {

  authCustomer: async((req, res, next)  => {
        let auth = req.headers['authorization'];
        
        if ( !auth ) {
            res.status(500).send({ message_error: 'Credenciales incorrectas' });
        }
        const token = auth.split(' ')[1];
        let [customerAccess] = await (customerModel.customer_access.findAll(
            {
                where: { 
                    access_token: token 
                }
            }
        ));
        if (customerAccess) {
            req.session = {
                 user_id: customerAccess.dataValues.customer_id,
                 customer: true 
                }
            next();
            return;
        }

        res.status(500).send({ message_error: 'Credenciales incorrectas' });
    }),

  authCollaborator: async((req, res, next)  => {
        let auth = req.headers['authorization'];
        
        if ( !auth ) {
            res.status(500).send({ message_error: 'Credenciales incorrectas' });
        }
        const token = auth.split(' ')[1];
        let [collaboratorAccess] = await (teamModel.team_access.findAll(
            {
                where: { 
                    access_token: token 
                }
            }
        ));
        if (collaboratorAccess) {
            req.session = { 
                user_id: collaboratorAccess.dataValues.collaborator_id,
                collaborator: true
             }
            next();
            return;
        }

        res.status(500).send({ message_error: 'Credenciales incorrectas' });
    }),

  authDeveloper: async((req, res, next)  => {
        let auth = req.headers['authorization'];
        
        if ( !auth ) {
            res.status(500).send({ message_error: 'Credenciales incorrectas' });
        }
        const token = auth.split(' ')[1];
        let [developerAccess] = await (developerModel.developer_access.findAll(
            {
                where: { 
                    access_token: token 
                }
            }
        ));
        if (developerAccess) {
            req.session = { 
                user_id: developerAccess.dataValues.developer_id,
                developer:true
             }
            next();
            return;
        }

        res.status(500).send({ message_error: 'Credenciales incorrectas' });
    }),
  authTTask: async((req, res, next)  => {
        let auth = req.headers['authorization'];
        
        if ( !auth ) {
            res.status(500).send({ message_error: 'Credenciales incorrectas' });
        }
        const token = auth.split(' ')[1];
        let [collaboratorAccess] = await (teamModel.team_access.findAll(
            {
                where: { 
                    access_token: token 
                }
            }
        ));

        let [authorization] = await(projectModel.project.findAll({
            where : {
                id: req.body.project_id,
                pm_id: collaboratorAccess.dataValues.collaborator_id
            }
        }
        ));
        
        if (!authorization) {
            res.status(500).send({ message_error: 'Credenciales incorrectas' });
        }      




        if (collaboratorAccess) {
            req.session = { 
                user_id: collaboratorAccess.dataValues.collaborator_id,
                collaborator: true
                }
            next();
            return;
        }

        res.status(500).send({ message_error: 'Credenciales incorrectas' });
    }),

   



    

}





module.exports = auth;