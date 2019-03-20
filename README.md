Based on [Tutorial: Build Your First CRUD App with Symfony and Angular](https://developer.okta.com/blog/2018/08/14/php-crud-app-symfony-angular)

Changes: 
 - authorisation via okta is thrown away 
 - Angular 7 is used instead of 6. And typescript version is newer. This couses some code changes:
 	- work with http in services is rewritten
 	- "\<any>error" replaced with "error as any"
 	- {title: title} replaced with {title}
 	- ".map(res => res.json())" is not needed more
 	- "map" calls are overwrapped in .pipe()
 	- in Movie interface definition, "Number" and "String" replaced with "number" and "string"
 	- "import 'rxjs';" instead of "import 'rxjs/Rx';"
 	- "increaseCount(id): Observable\<Movie>" replaced with "increaseCount(id): Observable\<any>"


To create the database structure, you need to register credentials in the symphony's config and run migrations  
run backend  
```php -S 127.0.0.1:8000 -t public```   
run frontend  
```ng serve --open```
