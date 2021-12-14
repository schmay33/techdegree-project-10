import config from "./config";

export default class Data {
	api(
		path,
		method = "GET",
		body = null,
		requiresAuth = false,
		credentials = null
	) {
		const url = config.apiUrl + path;

		const options = {
			method,
            body,
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
		};

		if (body !== null) {
            //console.log(body);
			options.body = JSON.stringify(body);
		}

		if (requiresAuth) {
			const encodedCredentials = btoa(
				`${credentials.username}:${credentials.password}`
			);
			options.headers["Authorization"] = `Basic ${encodedCredentials}`;
		}
        console.log(options);
		return fetch(url, options);
	}

    //TODO: Get User
    async getUser(username, password) {
        const response = await this.api('/users', 'GET', null, true, {username, password});
        if (response.status === 200) {
            return response.json().then(data => data);
        }
    }

    //TODO: Create User
    async createUser(user) {
        const response = await this.api('/users', 'POST', user, false, null);
        if (response.status === 201) {
            return [];
        }
        else if (response.status === 400) {
            return response.json().then(data => {
              return data.errors;
            });
        }
        else {
            throw new Error();
        }
    }

    // Get Courses
    async getCourses() {
        const response = await this.api('/courses', 'GET', null, false);
        if (response.status === 200) {
          return response.json().then(data => data);
        } else {
          throw new Error();
        }
    }

    //TODO: Get course by id
    async getCourse(id) {
        const response = await this.api(`/courses/${id}`, 'GET', null, false);
        if (response.status === 200) {
            return response.json().then(data => data);
          } else {
            throw new Error();
        }
    }

    // update course
    async updateCourse(id, course, username, password) {
        const response = await this.api(`/courses/${id}`, 'PUT', course, true, { username, password });
        if (response.status === 204) {
          return [];
        }
        else if (response.status === 400) {
          return response.json().then(data => {
            return data.errors;
          });
        }
        else {
          throw new Error();
        }
      }
}
