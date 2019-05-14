This is an express app for a todo list with connections using mongoose and connecting to a remote server called mongodb atlas

### Available Endpoints
* "/" : Method **GET**. This is the *endpoint* for the homepage.
	* **RESPONSE** : HOMEPAGE

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

* "/update/:taskId": Method **PATCH**. This is the *endpoint* for task update. It finds the task to be updated by the id.
	* **Request Object:**  **(UPDATE)**
		* taskName: Type(String)
		* time: Type(String)
		* description: Type(String)
		* isCompleted: Type(Boolean)
		* reminderTime: Type(String)
	* **Response Object:**  **(UPDATED TASK)**
		* taskName: Type(String)
		* time: Type(String)
		* description: Type(String)
		* isCompleted: Type(Boolean)
		* reminderTime: Type(String)

* "/delete/:taskId": Method **DELETE**. This is the *endpoint* for task delete. It finds the task to be deleted by the id.
	* **RESPONSE:** : *Task Successfully deleted*

* "/logout" : Method **GET**. This is the *endpoint* for the logout.			
	* **RESPONSE:** : *Log out successful*
