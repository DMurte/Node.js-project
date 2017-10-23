const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const customerModel = require('../../models/customer');
const projectModel = require('../../models/project');
const teamModel = require('../../models/team');

var request= {};

request.createProjectQuery = async ( (data) =>  {

   return new Promise( (resolve, reject) => {

        await ( projectModel.project.create(
                { 
                    title: data.title, 
                    subtitle: data.subtitle, 
                    budget: data.budget,
                    description:data.description, 
                    stage : 0,
                    status: 0
                }
            ));

        
        let [project] =  await (projectModel.project.findAll({where: { title: data.title, budget: data.budget} }));

        if (!project) {
            reject("Error al crear el proyecto");
            return;
        }

        project = project.dataValues;

        let [confirmation] = await (customerModel.project_customer.create({project_id: project.id, customer_id: data.customer_id} ))

        if (!confirmation) {
            reject("Error al crear la relacion");
            return;
        }


        resolve(project.id);
            
   })
    
})

request.updateProjectQuery = async ((data) => {
    return new Promise( (resolve, reject) => {

        let [project] = await (projectModel.project.findAll({ 
                                                                where: { 
                                                                        id: data.id 
                                                                    } 
                                                                }
                                                            ));
    
        if (!project) {
            reject("Este proyecto no existe");
            return;
        }

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
            resolve("No tiene autorización para actualizar este proyecto");
            return;
        } 


        await (projectModel.project.update(
                {
                    title: data.title,
                    subtitle: data.subtitle,
                    budget: data.budget,
                    estimated_time: data.estimated_time,
                    pm_id: data.pm_id,
                    tech_description: data.tech_description,
                    repo_url: data.repo_url,
                    status : data.status,
                    stage : data.stage,
                    description : data.description
                },
                {
                    where: { 
                        id: data.id
                    }
                }
                ));
       

        resolve("Proyecto actualizado");

    })
    
}) 

module.exports = request;

