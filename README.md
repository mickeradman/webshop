This is my webshop.


--- INSTRUCTIONS FOR TESTING ---

1. Run "pnpm install" in projects root folder.
   
2. Create a .env-file in the backend/ folder. And inside that file add these two lines:

   DB_URL = mongodb+srv://tempuser:TmDhNXzrCQBR31Nk@cluster0.txjsntp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

   PORT = 3000

   Note: Be sure you don't run any other services on port 3000.

3. Run the command "pnpm run seed" in projects root folder.

4. Run the command "pnpm dev" in projects root folder.

5. Open your preferred web browser and go to http://localhost:5173/

6. If you want to go to the admin-panel, which I'm currently working on, go to: http://localhost:5173/admin


--- NOTES ---

I was thinking one day that I need a admin panel/dashboard and since then I've been focusing almost a 100% on getting that page fixed. I want to
be able to CRUD directly from my the page instead of beeing forced to login to MongoDB to do all that stuff.
