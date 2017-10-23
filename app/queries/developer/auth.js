const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const utils = require('../../utils/utils');
const developerModel = require('../../models/developer');

var request = {};

request.createDeveloperQuery = async ( (data) =>  {
   return new Promise( (resolve, reject) => {
        const [developerConfirmation] =  await ( developerModel.developer.findAll({where: { email: data.email } }));
       
        if (developerConfirmation) {
            reject("Este email ya esta en uso");
            return;
        } 

        await ( developerModel.developer.create(
                { 
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    password: utils.encrypt(data.password),
                    profile_img: data.profile_img,
                    level: data.level,
                    cellphone: data.cellphone,
                    skype: data.skype,
                    country: data.country,
                    city: data.city,
                    cv: data.cv,
                    description: data.description,
                    linkedin: data.linkedin
                }
            ));

        let [developer] =  await (developerModel.developer.findAll({where: { email: data.email } }));
        developer = developer.dataValues;

        developer.token = utils.generateToken();

        await (developerModel.developer_access.create({developer_id: developer.id , access_token: developer.token }))
        delete developer.password;
        delete developer.id;

        resolve(developer);
        

    
   })
    
})

request.updateDeveloperQuery = async ((data) => {
    return new Promise( (resolve, reject) => {

        await (developerModel.developer.update(
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    profile_img: data.profile_img,
                    level: data.level,
                    cellphone: data.cellphone,
                    skype: data.skype,
                    country: data.country,
                    city: data.city,
                    cv: data.cv,
                    description: data.description,
                    linkedin: data.linkedin
                },
                {
                    where: { 
                        id: data.id
                    }
                }
                ));

        let [developer] = await (developerModel.developer.findAll({ where: { id: data.id } }))
        if (!developer) {
            reject("Este colaborador no existe");
            return;
        }

        developer = developer.dataValues;
        delete developer.id;
        delete developer.password;
        resolve(developer);

    })
    
}) 


request.loginDeveloperQuery = async ((data) => {
    return new Promise( (resolve , reject ) => {

        let [developer] = await (developerModel.developer.findAll(
                                {
                                    where: { 
                                        email: data.email , 
                                        password: utils.encrypt(data.password)
                                    }
                                }
                            ));

        if (!developer) {
            reject( "Credenciales incorrectas" );
            return;
        }

        developer = developer.dataValues;
        developer.token = utils.generateToken();
        await (developerModel.developer_access.create({ developer_id: developer.id , access_token: developer.token } ));
        delete developer.password;
        delete developer.id;
        resolve(developer);

    })
})

request.getDeveloperQuery = async ((data) => {

    return new Promise( (resolve , reject ) => {

        let [developer] = await (developerModel.developer.findAll({where: { id: data.id } }))
        developer = developer.dataValues;
        delete developer.password;
        delete developer.id;
        
        resolve(developer);

    })
    
})


module.exports = request;