require('dotenv').config();
const inquirer = require('inquirer');
const cTable = require('console.table');

const mysql = require('mysql2/promise');

async function main() {
    try{
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
                case 'View all roles':
                    console.log('View all roles selected')
                    break;
                case 'View all employees':
                    console.table(await company.viewAllEmployees());
                    break;
                case 'Add an employee':
                    
                    break;
                case "Add a department":
                    await inquirer.prompt({
                        type: 'input',
                        message: 'What is the name of the department',
                        name: 'nameOfNewDepartment',
                        validate: (name) => name !== ""
                    })
                    await company.addANewDepartment(department.nameOfNewDepartment)
                    break;
                case 'Exit':
                    process.exit(0);
                default:
                    break;

            }
        }



        console.log(selection);
        
    } catch(err) {
        if (err) console.log(err);
    }
}

main();

class Company {
    constructor(db_connection) {
        this.db = db_connection;
    }

    async viewAllDepartments() {
        const sql = `SELECT * FROM departments`;
        const [ rows ] = await this.db.query(sql)
        return rows;
    }

    async viewAllEmployees(){
        const sql = `SELECT e.id, e.first_name, e.last_name, roles.title AS title, departments.name AS department, roles.salary AS salary, 
                    CONCAT(m.first_name, ' ', m.last_name) AS manager
                    FROM employees e
                    LEFT JOIN roles ON e.role_id = roles.id,
                    LEFT JOIN departments ON roles.department_id = departments.id
                    LEFT JOIN employees m ON m.id = e.manager_id`

        const [ rows ] = await this.db.execute(sql, [department])
        if (result.affectedRows == 1) return this.viewAllDepartments()
    }

    async addANewDepartment(department) {
        const sql = `INSERT INTO departments (name) Values (?)`;
        const [ result ] = await this.db.execute(sql, [department ])
        if (result.affectRows === 1) return this.viewAllDepartments;
    }

    
}