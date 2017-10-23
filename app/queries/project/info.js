const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const customerModel = require('../../models/customer');
const projectModel = require('../../models/project');
const teamModel = require('../../models/team');


var request= {};

request.getProjectQuery = async ( (data) =>  {

   return new Promise( (resolve, reject) => {

    let [collaboratorAuth]= await (teamModel.project_team.findAll({
                                                                    where:{ 
                                                                        collaborator_id: data.user_id,
                                                                        project_id: data.id
                                                                        }
                                                                    }
                                                                ));

    let [customerAuth]= await (customerModel.project_customer.findAll({
                                                                        where:{ 
                                                                            customer_id: data.user_id,
                                                                            project_id: data.id
                                                                        }
                                                                    }
                                                                ));

    if ((!customerAuth)&&(!collaboratorAuth )) {
        reject('No tiene autorizacion para ver el proyecto');
        return;
    } 

     
    let [project]= await (projectModel.project.findAll({
                                                where:{
                                                    id : data.id
                                                }
                                            }
                                        ));
    
    if(!project){
        resolve('Este proyecto no existe')
        return;
    }
        resolve(project)

            
   })
    
})

module.exports = request;
