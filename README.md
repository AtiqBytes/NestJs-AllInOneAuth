
# NestJs Authentication & Authorization With passportjs Having Role-based, Claim-Based And Castl

Are you tired of worrying about user authentication and authorization in your NestJS applications and want all In One Solution containing  Role-based, Claim-Based And Castl all integrated in a database file? Look no further! This project provides a comprehensive, battle-tested solution for managing user access and permissions, so you can focus on building amazing apps.

Built for developers, by developers

Whether you're a solo dev or part of a team, this project is designed to help you:

1. Secure your app with robust authentication and authorization

2. Scale your solution with confidence

3. Customize access control to fit your unique needs


## API Reference

#### Create a bunch of Fake Users

```http
  POST   http://localhost:3000/faker
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `No Paramters Required` | `string` | **Required**. Running database |

#### Login User

```http
  POST   http://localhost:3000/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username,password`      | `string` | **Required**.  |

#### View  Profile of All Users

```http
  GET http://localhost:3000/users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `access_token`      | `string` | **Required**. Jwt Access Token |


## Appendix

Any additional information goes here


## Author

- [AtiqBytes](https://github.com/AtiqBytes)
## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Demo



## Deployment

To deploy this project run

```bash
  npm run start:dev
```


## Documentation

1.  [Jwt](https://jwt.io/)

2.  [Passport Js](https://docs.nestjs.com/recipes/passport)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. You can customize it the way you want :

`DB_PORT='5432'`

`DB_USERNAME='postgres'`

`DB_PASSWORD='root'`

`DB_DATABASE='allInOneAuth'`


# FAQS

#### 1. Why are roles not being picked up by the RolesGuard?

Issue: When trying to use RolesGuard, the user object does not seem to have any roles, and access is denied.

Solution:

Ensure that the user object being attached to the request in the JwtStrategy or AuthService contains the roles.

If the user roles are missing, it’s likely that the JwtStrategy.validate() method is only returning partial data. Modify the validate() method to fetch the full user object, including roles, from the database using UsersService.

Example:

```typescript
async validate(payload: any) {
  const user = await this.userService.findOne(payload.username);  // Fetch user with roles
  return user;
}
```

#### 2. Why is my RolesGuard not being applied at all?

Issue: The RolesGuard is not being invoked, so role-based access control is not being enforced.

Solution:

Make sure the RolesGuard is applied globally or at the controller/route level. If you want it applied across the entire application, register it as a global guard in app.module.ts or auth.module.ts.

Example:

```typescript
@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,  // Apply globally
    },
  ],
})
```

Alternatively, apply it at the route or controller level with @UseGuards(JwtAuthGuard, RolesGuard).

#### 3. Why is the CurrentUser decorator not returning the user’s roles or permissions?

Issue: The CurrentUser decorator is returning the user object, but roles or permissions are missing.

Solution:

The CurrentUser decorator fetches the user from request.user. Ensure that the JwtStrategy or LocalStrategy attaches the full user object, including roles and permissions, to the request.
If roles or permissions are missing, update the authentication strategy to fetch the complete user data from the database.

#### 4. Why is my JwtStrategy not returning roles or permissions?

Issue: The JwtStrategy is only returning userId and username, which isn’t enough for role-based access control.

Solution:

Modify the JwtStrategy.validate() method to return the full user object with roles and permissions. Use the UsersService to fetch the user from the database, ensuring roles and permissions are loaded.

Example:
```typescript
async validate(payload: any) {
  const user = await this.usersService.findOne(payload.username);  // Load user with roles
  return user;
}
```

#### 5. Why are my signup and signin routes not working after applying global guards?

Issue: After applying a global authentication guard, routes like signup and signin are also being protected, even though they shouldn’t require authentication.

Solution:

Use a Public decorator for the routes that shouldn’t require authentication (such as signup or signin). This ensures that these routes bypass the global guard.

Example:
```typescript
@Public()
@Post('signup')
signup(@Body() createUserDto: CreateUserDto) {
  return this.authService.signup(createUserDto);
}
```

#### 6. Why does the JWT payload not contain roles or permissions?

Issue: The JWT token only contains userId and username, which isn’t enough to enforce role-based or permission-based access control.

Solution:

Update the JWT payload in your AuthService to include roles and permissions when generating the JWT token. This ensures that the information is available when the token is decoded.

Example:

```typescript
const payload = { username: user.username, sub: user.userId, roles: user.roles, permissions: user.permissions };
return this.jwtService.sign(payload);
```

#### 7. How do I check if roles and permissions are correctly attached to the user object?

Solution:

Add console logs inside your JwtStrategy or AuthService to verify that the user object contains roles and permissions before it’s attached to req.user.

Example:
```typescript
async validate(payload: any) {
  const user = await this.usersService.findOne(payload.username);
  console.log('User in JWT strategy:', user);  // Check if roles and permissions are attached
  return user;
}
```

#### 8. How can I enforce role-based access control on specific routes?
Solution:

Use the @Roles() decorator on specific routes and apply the RolesGuard to enforce role-based access control.

Example:

```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ClientRole.Admin)
@Get('admin-data')
getAdminData() {
  return 'Admin data';
}
```

This ensures that only users with the specified roles can access the protected route.

#### 9. Why are the roles in my user object undefined after logging in?

Issue: After logging in, the user object does not include roles, making it impossible to enforce role-based access.

Solution:

Check the JwtStrategy.validate() method or LocalStrategy.validate() to ensure the user is being fetched from the database with roles and permissions. If you're returning only userId and username, the roles will be missing.
Update the method to load the full user object, including roles.

#### 10. How can I manage user roles and permissions efficiently in the database?

Solution:

Use many-to-many relationships in your User and Role entities to link users with multiple roles and permissions.

Ensure that when querying users, you use leftJoinAndSelect in TypeORM to load both roles and permissions along with the user.

Example:
```typescript
const user = await this.usersRepository
  .createQueryBuilder('user')
  .leftJoinAndSelect('user.roles', 'role')
  .leftJoinAndSelect('role.permissions', 'permission')
  .where('user.username = :username', { username })
  .getOne();
```

This approach ensures roles and permissions are properly managed and loaded when needed.


## Features

- Role-Based Access Control
- Claim-Based Access Control
- Castl
- JSON Web Token Authentication
- Customizable Authentication Flow
- Environment Variable Configuration
- Database Support
- Error Handling and Logging
- Cross-Platform Compatibility

## Feedback

If you have any feedback, please reach out to me at https://www.linkedin.com/in/atiq-ur-rehman-1314712aa/


## 🚀 About Me
I'm a full stack developer...

wokring in Angular | 
NestJs | 
Django |
Amazon Aws
# Hi, I'm Atiq Ur Rehman! 👋


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/AtiqBytes)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/atiq-ur-rehman-1314712aa/)



## Other Common Github Profile Sections
👩‍💻 I'm currently working on Backend

🧠 I'm currently learning NestJs

👯‍♀️ I'm looking to collaborate on full Stack Projects

🤔 I'm looking for help with getting Internship



## 🛠 Skills
Typescript, Javascript, HTML, CSS, Python


## Installation

Install my-project with npm

```bash
  cd my-project
  npm install 
  
```
      
## Lessons Learned:

## Authorization with Roles and Permissions:

Files Involved: role.enum.ts, permission.entity.ts, role.entity.ts

- I learned how to manage authorization using roles and permissions effectively. By defining roles such as admin, editor, and user in role.enum.ts, I structured role management within the database.
- Permissions were tied to roles in permission.entity.ts and role.entity.ts, allowing fine-grained control over actions based on user roles.
- This setup provided a clear separation of concerns, allowing for role-based access control (RBAC) using guards and decorators.
  
## Defining Roles in the DTOs:

Files Involved: find-users.dto.ts

-When creating Data Transfer Objects (DTOs) such as find-users.dto.ts, I included an extra attribute for roles. This ensured that when performing user-related actions, such as retrieving multiple users, the backend can expect and validate role-based filters.
- Understanding the use of DTOs allowed me to define what query parameters can be passed to the findMany() method and expanded the filtering options by roles.
  
## Role Decorator and Guard:

Files Involved: roles.decorator.ts, roles.guard.ts

- To enforce role-based restrictions, I created a role decorator (roles.decorator.ts) and a guard (roles.guard.ts).
- The role decorator was used to specify which roles (e.g., Admin, Editor) are allowed to access certain routes. This was applied to routes like findMany() to ensure only users with the correct roles can access them.
- The role guard then validated the user's roles from the user object and compared it with the required roles specified by the decorator. It enforced role-based access control by checking if the authenticated user had the necessary roles.
  
## Issue with Missing Roles in JWT Payload:

Files Involved: jwt.strategy.ts

- One of the critical issues I faced was related to roles not being attached to the user object. Initially, in the JwtStrategy, I was only returning { userId, username, role } in the validate() method.
- The problem was that the full user, including roles and permissions, wasn't being returned, causing RolesGuard to fail because user.roles was undefined.
- Solution: I updated the validate() function in jwt.strategy.ts to fetch the full user, including roles and permissions, from the database using UsersService. This allowed RolesGuard to properly check for role-based access.
  
## CurrentUser Decorator:

Files Involved: current-user.decorator.ts

- I learned that the CurrentUser decorator was fetching the user from the request (req.user), which is populated during authentication. However, it relies on what the JwtStrategy attaches to the user object.
- If the roles or permissions are not attached to the user object during JWT validation, the decorator cannot retrieve them, leading to issues in role-based access checks.
- Once I fixed the JwtStrategy to return the full user, the CurrentUser decorator worked as expected by providing the complete user object, including roles and permissions.
  
## Issue with Role Guard Not Picking Roles:

Files Involved: roles.guard.ts, jwt.strategy.ts, auth.service.ts

- The most critical issue was when the RolesGuard wasn’t picking up roles from the user object. I discovered that the problem lay in the JwtStrategy, where I was initially only returning { userId, username, role } instead of the full user object with roles.
-  To resolve this, I updated the JwtStrategy to fetch the user from the database with all associated roles and permissions. This allowed RolesGuard to properly enforce role-based access.
- I also confirmed that req.user was populated correctly with roles using logging and debugging techniques.
  
## Role Guard Not Being Applied Globally:

Files Involved: app.module.ts, auth.module.ts

- Another lesson learned was that I hadn’t applied the RolesGuard globally, which caused it to not be invoked for certain routes. Guards must be applied either globally (in app.module.ts or auth.module.ts) or explicitly at the route/controller level.
- After applying the RolesGuard globally in app.module.ts, it started enforcing role-based access control across the entire application.
  
## JWT Payload and Permissions:

Files Involved: auth.service.ts, jwt.strategy.ts

- There was an additional issue where the JWT payload wasn’t encoding all the necessary permissions. Initially, I was only encoding the user's username and userId, which wasn’t enough to check permissions.
- Solution: I updated the payload to include the roles and permissions within the JWT payload and validated this through JwtStrategy. This allowed permissions to be enforced correctly, not just roles.


## License

[MIT](https://choosealicense.com/licenses/mit/)


![Logo](https://docs.nestjs.com/assets/logo-small-gradient.svg)


## Related

Here are some related projects

[Awesome README](https://github.com/matiassingers/awesome-readme)


## Running Tests

To run tests, run the following command

```bash
  npm run test
```
unit tests : 
 ```
 
 npm run test
 ```

 e2e tests : 
```
$ npm run test:e2e
```
test coverage: 
```

 npm run test:cov
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/AtiqBytes/passport-jwt-nestjs.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev
```

