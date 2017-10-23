const async = require('es5-async-await/async');
const await = require('es5-async-await/await');

const utils = require('../../utils/utils');
const customerModel = require('../../models/customer');

var request= {};

request.createCustomerQuery = async ( (data) =>  {

   return new Promise( (resolve, reject) => {

        const [customerConfirmation] =  await (customerModel.customer.findAll({where: { email: data.email } }));

        if (customerConfirmation) {
            reject("Este email ya esta en uso");
            return;
        } 

        await ( customerModel.customer.create(
                { 
                    first_name: data.first_name, 
                    last_name: data.last_name, 
                    email: data.email, 
                    password: utils.encrypt(data.password), 
                    company: data.company, 
                    skype: data.skype, 
                    status: 1
                }
            ));

        let [customer] =  await (customerModel.customer.findAll({where: { email: data.email } }));
        customer = customer.dataValues;

        if ( data.project_id ) {
            await (customerModel.project_customer.create({project_id: data.project_id, customer_id: customer.id} ))
        }

        customer.project_id = data.project_id;
        customer.token = utils.generateToken();

        await (customerModel.customer_access.create({customer_id: customer.id , access_token: customer.token }))
        delete customer.password;
        delete customer.id;

        resolve(customer);
        

    
   })
    
})

request.updateCustomerQuery = async ((data) => {
    return new Promise( (resolve, reject) => {

        if(data.email!=data.old_email){
            let [email] = await(customerModel.customer.findAll({where:{ email: data.email }})); 
            if(email){
                reject("Este email ya existe")
                return;
            }
        }
       

        await (customerModel.customer.update(
                {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    company: data.company,
                    skype: data.skype,
                    status: data.status 
                },
                {
                    where: { 
                        id: data.id
                    }
                }
                ));

        let [customer] = await (customerModel.customer.findAll({ where: { id: data.id } }))
        if (!customer) {
            reject("Este cliente no existe");
            return;
        }

        customer = customer.dataValues;
        delete customer.id;
        delete customer.password;
        resolve(customer);

    })
    
}) 


request.loginCustomerQuery = async ((data) => {
    return new Promise( (resolve , reject ) => {

        let [customer] = await (customerModel.customer.findAll(
                                {
                                    where: { 
                                        email: data.email , 
                                        password: utils.encrypt(data.password)
                                    }
                                }
                            ));

        if (!customer) {
            reject( "Credenciales incorrectas" );
            return;
        }

        customer = customer.dataValues;
        customer.token = utils.generateToken();
        await (customerModel.customer_access.create({ customer_id: customer.id , access_token: customer.token } ));
        delete customer.password;
        delete customer.id;
        resolve(customer);

    })
})

request.getCustomerQuery = async ((data) => {

    return new Promise( (resolve , reject ) => {

        let [customer] = await (customerModel.customer.findAll({where: { id: data.id } }))
        customer = customer.dataValues;
        delete customer.password;
        delete customer.id;
        
        resolve(customer);

    })
    
})


request.updateCustomerPasswordQuery = async ((data) => {
    return new Promise( (resolve, reject) => {
        
        let [auth] = await(customerModel.customer.findAll({
                                                            where:{ 
                                                                password: utils.encrypt(data.old_password),
                                                                id: data.id
                                                            }
                                                        })
                                                    ); 

        if(!auth){
                reject("Contraseña incorrecta")
                return;
        }
       

        await (customerModel.customer.update(
                {
                    password: utils.encrypt(data.password)
                },
                {
                    where: { 
                        id: data.id
                    }
                }
                ));

        resolve("La contraseña ha sido actualizada");

    })
    
}) 


module.exports = request;


