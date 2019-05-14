This is an express app for a todo list with connections using mongoose and connecting to a remote server called mongodb atlas

### Available Endpoints
* "/signup": This is the endpoint for user registration. Method POST.
	* Request Object:
		* firstname
		* lastname
		* email
		* username
		* password
		* phonenumber
		* address
		* bio
	* Response Object:
		* username
		* password	 
* "/login": This is the endpoint for login. Method POST.
	* Request Object:
		* username
		* password
	* Response Object:
		* username
		* password	 