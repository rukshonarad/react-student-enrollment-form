class StudentApi {
    constructor() {
        this.endpoint = process.env.REACT_APP_API;
    }

    async create(newStudent) {
        const { firstName, lastName, email, className } = newStudent;
        try {
            const response = await fetch(`${this.endpoint}/students`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    className: className
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            return await response.json();
        } catch (error) {
            console.log(error.message);
        }
    }

    async getAll() {
        try {
            const response = await fetch(`${this.endpoint}/students`);
            if (!response.ok) {
                throw new Error(response.error);
            }

            return await response.json();
        } catch (error) {
            console.log(error.message);
        }
    }

    async deleteOne(id) {
        try {
            const response = await fetch(`${this.endpoint}/students/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async updateOne(id, updatedStudent) {
        const { firstName, lastName, email, className } = updatedStudent;

        try {
            const response = await fetch(`${this.endpoint}/students/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    className: className
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            return await response.json();
        } catch (error) {
            console.log(error.message);
        }
    }
}

export const studentApi = new StudentApi();
