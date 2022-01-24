require('dotenv').config();
const inquirer = require('inquirer');
require('console.table');
const Company = require('./src/Company');

const mysql = require('mysql2/promise');

async function main() {
    try {
        const connection = await mysql.createConnection({ 
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE, 
            user: process.env.DB_USER, 
            password: process.env.DB_PASS 
        })

        const company = new Company(connection)
        

        let exit = false;

        while(exit === false){
            const selection = await inquirer.prompt({
                type: 'list',
                name: 'choice',
                message: 'What would you like to do?',
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add A Department',
                    'Add A Role',
                    'Add an Employee',
                    'Update an employee role',
                    'Exit'
                ]
            })
    
            switch (selection.choice){
                case 'View All Departments':
                    console.table(await company.viewAllDepartments());
                    break;
                case 'View All Employees':
                    console.table(await company.viewAllEmployees());
                    break;
                case "View All Roles":
                    console.table(await company.viewAllRoles());
                    break;
                case "Add A Department":
                    const department = await inquirer.prompt({
                        type: 'input',
                        message: 'What is the name of the department',
                        name: 'nameOfNewDepartment',
                        validate: (name) => name !== ""
                    })
                    console.table(await company.addANewDepartment(department.nameOfNewDepartment));
                    break;
                case 'Add A Role':
                    const roleQuestions = [
                        {
                            type: 'input',
                            name: 'title',
                            message: 'What is the name of the role you wish to add?',
                            validate: (answer) => answer !== ''
                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'What is the salary for the role',
                            validate: (answer) => answer !== ''
                        },
                        {
                            type: 'input',
                            name: 'department_id',
                            message: 'What is the department id?',
                            validate: (answer) => answer !== ''
                        }
                    ];
                    const roleAnswers = await inquirer.prompt(roleQuestions);
                        console.table(await company.addANewRole(roleAnswers))
                        break;
                case 'Update an employee role':
                    const updateRoleQuestions = [
                    {
                        type: 'number',
                        name: 'id',
                        message: 'Please enter id of the employee you want to update in the database',
                    },
                    {
                        type: 'number',
                        name: 'role_id',
                        message: 'Please enter the new role id for the employee you wish to update. (Only numbers are accepted)'
                    }
                ]
                const updateRoleAnswers = await inquirer.prompt(updateRoleQuestions);
                    console.table(await company.updateRole(updateRoleAnswers))
                    break;

                case 'Add an Employee':
                    const questions = [
                        {
                            type: 'input',
                            name: 'first_name',
                            message: 'What is the first name of the employee?',
                            validate: (answer) => answer !== '',
                        },
                        {
                            type: 'input',
                            name: 'last_name',
                            message: 'What is the employees last name?',
                            validate: (answer) => answer !== '',
                        },
                        {
                            type: 'input',
                            name: 'role_id',
                            message: 'What is the employees role id?',
                            validate: (answer) => answer !== ''
                        },
                        {
                            type: 'input',
                            name: 'manager_id',
                            message: 'What is the employees manager number?',
                            validate: (answer) => answer !== ''
                        }
                    ];

                    const answers = await inquirer.prompt(questions);
                        console.table(await company.addANewEmployee(answers))
                        break;
                    case 'Exit':
                        connection.destroy()
                        process.exit(0)
                    default: 
                        break;
            }
        }

    } catch(err) {
        if (err) console.log(err);
    }
}

main();

