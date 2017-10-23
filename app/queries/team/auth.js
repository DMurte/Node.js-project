const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const utils = require('../../utils/utils');
const teamModel = require('../../models/team');

var request = {};

request.createCollaboratorQuery = async ( (data) =>  {
    console.log("query-promise");
   return new Promise( (resolve, reject) => {
    console.log('Querie');
        const [collaboratorConfirmation] =  await ( teamModel.team.findAll({where: { email: data.email } }));
        console.log(collaboratorConfirmation);

        if (collaboratorConfirmation) {
            console.log("collaboratorConfirmation");
            reject("Este email ya esta en uso");
            return;
        } 
        console.log("before query");

        await ( teamModel.team.create(
                { 
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    password:utils.encrypt(data.password),
                    type: data.type,
                    profile_img: data.profile_img,
                    status: 1,
                    cellphone: data.cellphone,
                    skype: data.skype,
                    country: data.country,
                    city: data.city,
                    cv: data.cv,
                    description: data.description,
                    projects_number:0
                }
            ));

        let [collaborator] =  await (teamModel.team.findAll({where: { email: data.email } }));
        collaborator = collaborator.dataValues;

        collaborator.token = utils.generateToken();

        await (teamModel.team_access.create({collaborator_id: collaborator.id , access_token: collaborator.token }))
        delete collaborator.password;
        delete collaborator.id;

        resolve(collaborator);
        

    
   })
    
})

request.updateCollaboratorQuery = async ((data) => {
    return new Promise( (resolve, reject) => {

        await (teamModel.team.update(
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    type: data.type,
                    profile_img: data.profile_img,
                    status: data.status,
                    cellphone: data.cellphone,
                    skype: data.skype,
                    country: data.country,
                    city: data.city,
                    cv: data.cv,
                    description: data.description,
                    projects_number: data.projects_number
                },
                {
                    where: { 
                        id: data.id
                    }
                }
                ));

        let [collaborator] = await (teamModel.team.findAll({ where: { id: data.id } }))
        if (!collaborator) {
            reject("Este colaborador no existe");
            return;
        }

        collaborator = collaborator.dataValues;
        delete collaborator.id;
        delete collaborator.password;
        resolve(collaborator);

    })
    
}) 


request.loginCollaboratorQuery = async ((data) => {
    return new Promise( (resolve , reject ) => {

        let [collaborator] = await (teamModel.team.findAll(
                                {
                                    where: { 
                                        email: data.email , 
                                        password: utils.encrypt(data.password)
                                    }
                                }
                            ));

        if (!collaborator) {
            reject( "Credenciales incorrectas" );
            return;
        }

        collaborator = collaborator.dataValues;
        collaborator.token = utils.generateToken();
        await (teamModel.team_access.create({ collaborator_id: collaborator.id , access_token: collaborator.token } ));
        delete collaborator.password;
        delete collaborator.id;
        resolve(collaborator);

    })
})

request.getCollaboratorQuery = async ((data) => {

    return new Promise( (resolve , reject ) => {

        let [collaborator] = await (teamModel.team.findAll({where: { id: data.id } }))
        collaborator = collaborator.dataValues;
        delete collaborator.password;
        delete collaborator.id;
        
        resolve(collaborator);

    })
    
})


module.exports = request;


