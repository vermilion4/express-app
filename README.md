This is an express app for a todo list with connections using mongoose and connecting to a remote server called mongodb atlas

### Available Endpoints
* "/" : Method **GET**. This is the *endpoint* for the homepage.

* "/signup": Method **POST**. This is the *endpoint* for user registration. 
	* **Request Object:**
		* firstname : Type(String)
		* lastname : Type(String)
		* email : Type(String)
		* username : Type(String)
		* password : Type(String)
		* phonenumber : Type(Number)
		* address : Type(String)
		* bio : Type(String)
	* **Response Object:**
		* username : Type(String)
		* password : Type(String)	 

* "/login": Method **POST**. This is the *endpoint* for login. 
	* **Request Object:**
		* username : Type(String)
		* password : Type(String)
	* **Response Object:**
		* username : Type(String)
		* password : Type(String)	 

* "/task": Method **POST**. This is the *endpoint* for the task to be put in the todo app.
	* **Request Object:**
		* taskName: Type(String)
		* time: Type(String)
		* description: Type(String)
		* isCompleted: Type(Boolean)
		* reminderTime: Type(String)
	* **Response Object:**
		* taskName: Type(String)
		* time: Type(String)
		* description: Type(String)
		* isCompleted: Type(Boolean)
		* reminderTime: Type(String)		