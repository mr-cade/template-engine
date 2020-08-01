# template-engine
This is a software engineering team generator command line application. The application will prompt the user for information about the team manager and then information about the team members. Each type of employee is a subclass based on the parent class "Employee". Inquirer will route different questions regarding the subclasses of employees depending on the selected type.

Once the user is finished creating employee profiles, the application will output an .html file containing the input information.

This application was built using test driven development.

### Use Case
```
As a manager
I want to generate a webpage that displays my team's basic info
so that I have quick access to emails and GitHub profiles
```

### To Initialize Application
```
npm install
node app.js
```
### Example Output
![image](https://user-images.githubusercontent.com/62723135/89110034-d1ea3900-d403-11ea-93ef-3b02096d9644.png)
