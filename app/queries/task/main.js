const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const taskModel = require('../../models/task');
const customerModel = require('../../models/customer');
const projectModel = require('../../models/project');
const teamModel = require('../../models/team');


var request= {};

request.createTaskQuery = async ( (data) =>  {

   return new Promise( (resolve, reject) => {

    await ( taskModel.task.create(
                { 
                    project_id: data.project_id, 
                    title: data.title, 
                    description: data.description, 
                    stage: data.stage,
                    status : 0,
                    dificulty_level: data.dificulty_level, 
                    expiration : data.expiration,
                    label: data.label,
                    developer_id: data.developer_id,
                    price: data.price,
                    points: data.points
                }
            ));
           
        
        let [task] =  await (taskModel.task.findAll({
                                                        where: { 
                                                            project_id: data.project_id,
                                                            dificulty_level: data.dificulty_level,
                                                            title : data.title,
                                                            description: data.description
                                                           
                                                           
                                                        }
                                                    }
                                                ));
                                

        if (!task) {
            reject("Error al crear la tarea");
            return;
        }


        task = task.dataValues;
        
        resolve(task);
            
   })
    
})

request.updateTaskQuery = async ((data) => {
    return new Promise( (resolve, reject) => {

        let [task] = await (taskModel.task.findAll({ 
                                                                where: { 
                                                                        id: data.id 
                                                                    } 
                                                                }
                                                            ));
    
        if (!task) {
            reject("Esta tarea no existe");
            return;
        }

                                                            
        await (taskModel.task.update(
                {
                    project_id: data.project_id, 
                    title: data.title, 
                    description: data.description, 
                    stage: data.stage,
                    status : 0,
                    dificulty_level: data.dificulty_level, 
                    expiration : data.expiration,
                    label: data.label,
                    developer_id: data.developer_id,
                    price: data.price,
                    points: data.points
                },
                {
                    where: { 
                        id: data.id
                    }
                }
                ));
       

        resolve("Tarea actualizada");

    })
    
}) 

request.deleteTaskQuery = async((data)=>{
    return new Promise ((resolve, reject)=>{
        let [task] = await (taskModel.task.findAll({ 
            where: { 
                    id: data.id 
                } 
            }
        ));

        if (!task) {
        reject("Esta tarea no existe");
        return;
        }

    task = task.dataValues

        let [auth] = await (projectModel.project.findAll({ 
            where: { 
                    id: task.project_id ,
                    pm_id: data.collaborator_id
                } 
            }
        ));

        if (!auth) {
            reject("Credenciales incorrectas");
            return;
            }

        taskModel.task.destroy({
            where: {
                    id: data.id
                    }
                })

        resolve('Tarea eliminada')
    })   
})





module.exports = request;

