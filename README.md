# IPL Dashboard

Hi, welcome to the documentation of the IPL Dashboard.

Here a NEXT JS app is created to showcase the details of the IPL Dashboard.
The app faced challenged when trying to scrape the data from `https://www.iplt20.com/`

Two approaches were used.
One approach was to make a get call to the web page to get the html content of the page.
But the idea failed as the html response did not contain any dynamic data about our requirements.

In the second approach Playwright was used to load the page.
But the idea failed as the page did not allow playwright to load.

So dynamically changed random data is used.

In the application uses Incremental Static Regeneration with different revalidation time frame.
Atomic design pattern is used here break down the application into smaller components.
The application interface is kept as responsive using tailwind css.

### Instruction to use
Run ```npm install``` to install all the dependencies.
Run ```npm run dev``` to run the application.