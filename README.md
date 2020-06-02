# Valispace

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# Path ‘/admin’
This path will enable the user to add, edit and remove employees from a database.

## Requirements:
- All fields (see below) are required;
- ID and Phone are unique;
- ID cannot be changed but all the other values can;
Optional requirements:
- Username is only valid with the format [\w-_]+

# Path ‘/’
On this path we want to create, edit and remove posts. Similar to the Facebook timeline, on
the top you have the ability to create a new post and below the list of previous posts is
shown ordered by date.

## Requirements:
- By typing ‘@’ inside a new post there should popup an autocomplete to help user
select an employee to refer in the post;
- When changing the username of an employee, it should reflect in already created
posts. A possible solution is saving the text of the post as < employee id=”1”
field=”username”></ employee> instead of @mathilde, or # 992312312;
Optional requirements:
- By typing ‘#’ it should popup an autocomplete to help user select the phone number;
- Inside the post, when hovering the username or name of an employee a popup
should show with the full details of that employee (name, username, phone, role);
- Possibility to edit already posted messages.

## Requirements for path “/admin”:
- (X) 1) User can add, edit and remove employees;
- (X) 2) All fields (ID, username, phone, role, name) are required;
- (X) 3) ID and Phone are unique;
- (X) 4) ID cannot be changed but all the other values can;

## Requirements for path “/” for posts at “/”:
- (X) 1) Users can add posts on a timeline;
- (X) 2) By typing ‘@’ inside a post an autocomplete should pop up to help user select an
employee;
- (X) 3) When changing the username of an employee, it should reflect in already created
posts. A possible solution is saving the text of the post as < employee id=”1”
field=”username”></ employee> instead of @mathilde, or # 992312312;
- (X) All data is saved and retrieved by services;
- (X) Although you can use external libraries, you managed to get it to work by yourself.


## Notes
For the autocomplete my initial thought was to save a string in the html format "< employee></ employee>" but the chrome for security reasons doesn't permit loading html string in the DOM. So I had to come up with a different strategy. Basically when the user selected a autocomplete option I save in the object a string with the id of the user for example if the user types @mathilde, I save a string @%1. Then in the post.component if the string is in that format I create the employee component.