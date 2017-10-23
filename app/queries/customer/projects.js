const async = require('es5-async-await/async');
const await = require('es5-async-await/await');
const sendEmail = require('send-email');

const customerModel = require('../../models/customer');
const projectModel = require('../../models/project');
const teamModel = require('../../models/team');

var request= {};

request.getProjectsQuery = async ( (data) =>  {

   return new Promise( (resolve, reject) => {

        const customerProjects =  await (customerModel.project_customer.findAll({ 
                                                                                where: { customer_id: data.id }, 
                                                                                attributes:['project_id']
                                                                      }));

        if (!customerProjects[0]) {
        resolve([]);
        return;
        }
         
        let projects = [];
        customerProjects.forEach((res,i) => {
            [projects[i]] = await( projectModel.project.findAll({
                                                                where: { id: customerProjects[i].project_id },
                                                                attributes: ['id','title','subtitle',['pm_id','pm'],'budget']
                                                             })
                                                        );               
 })
       
        
        resolve(projects);
             
    })
})



module.exports = request;




 //projects[i] = projects[i][0]


//    pmr =  await( teamModel.team.findAll({
        //                                             where: { id: projects[i][0].pm},
        //                                             attributes: ['first_name']
        //                                        })
        //                                 );
                                       
            // if (!pmanager){
            //     projects[i][0].pm = 'Aun no ha sido asignado un Project Manajer'
            // }else{
            //     projects[i][0].pm = pmanager.dataValues.first_name   
            // }