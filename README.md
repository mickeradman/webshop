# This is my webshop.

I started working on this project as a degree project during the time I was studying to become a JavaScript developer. After my studies were finished I decided to continue working on it.

<br>

## Instructions for testing

1. Clone the dev-branch.

2. Run "pnpm install" in projects root folder.
   
3. Create a .env-file in the backend/ folder and add these two lines:

         DB_URL = mongodb+srv://tempuser:TmDhNXzrCQBR31Nk@cluster0.txjsntp.mongodb.net/webshop-db?retryWrites=true&w=majority&appName=Cluster0
         PORT = 3000

4. Run the command "pnpm run seed" in projects root folder.

5. Run the command "pnpm dev" in projects root folder.

6. Open your preferred web browser and go to http://localhost:5173/

7. If you want to go to the admin-panel, which I'm currently working on, go to: http://localhost:5173/admin

Note: Make sure you don't run any other services on ports 3000 and 5173.

<br>

## Additional notes

* One day, I realized that I needed an admin panel/dashboard, and since then, I've been focusing almost 100% on getting that page and its functionality done.
  I want to be able to perform CRUD operations directly from the page instead of being forced to log in to MongoDB to do all that stuff.

* Right now there's no login to the page as it's under development. The same goes for the admin panel.

* As I said I've been focusing on the admin panel lately, so I haven't yet implemented pagination and filtering on the "regular page". Which means
  that right now one is only able to see the first ten products (as 10 products/page is set as standard).

* Functionality that works right now in the admin panel is:
  - Filtering.
  - Pagination.
  - Editing existing fields and updating database.
 
* Functionality that doesn NOT work in the admin panel at the moment:
  - Add new product to db.
  - Add new field to a product (though the button exist at least ;).
  - Remove product from db.
  - Probably a lot more more functionalities that I haven't figured out yet.

<br>

## Regrets

* That I didn't start this projekt with a wireframe and a prototype...
