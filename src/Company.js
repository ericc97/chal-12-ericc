class Company {
    constructor(db_connection) {
        this.db = db_connection;
    }

    async viewAllDepartments() {
        const sql = `SELECT * FROM departments`;
        const [ rows ] = await this.db.query(sql);
        return rows;
    }

    async viewAllRoles() {
        const sql = `SELECT * FROM roles`;
        const [ rows ] = await this.db.query(sql);
        return rows;
    }

    async viewAllEmployees(){
        const sql = `SELECT e.id, e.first_name, e.last_name, roles.title AS title, departments.name AS department, roles.salary AS salary, 
                CONCAT(m.first_name, ' ', m.last_name) AS manager
                FROM employees e
                LEFT JOIN roles ON e.role_id = roles.id
                LEFT JOIN departments ON roles.department_id = departments.id
                LEFT JOIN employees m ON m.id = e.manager_id`

        const [ rows ] = await this.db.query(sql)
        return rows;
    }

    async addANewDepartment(department) {
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        const [ result ] = await this.db.execute(sql, [department])
        if (result.affectRows === 1) return this.viewAllDepartments;
    }

    async addANewRole({title, salary, department_id}) {
        const sql = `INSERT INTO roles (title, salary, department_id) Values (?,?,?)`;
        const [ result ] = await this.db.execute(sql, [title, salary, department_id]);
        if(result.affectRows === 1) return this.viewAllRoles;
    }

    async addANewEmployee({ first_name, last_name, role_id, manager_id}) {
		try {
			const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
			const [ result ] = await this.db.execute(sql, [first_name, last_name, role_id, manager_id])
			if (result.affectedRows === 1) return this.viewAllEmployees()
		} catch (error) {
			return 'Please enter valid role_id and manager_id\n'
		}
	}

    async updateRole({id, role_id}) {
        console.log(id, role_id);
        try {
            const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
            const [ result ] = await this.db.query(sql, [role_id, id])
            if (result.affectRows === 1) return this.viewAllEmployees()
        } catch(err) {
            return 'Please try again'
        }
    }
}

module.exports = Company;