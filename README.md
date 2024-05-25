# University's Search Engine

## Running Instructions:

-   **Install requirements:**

    -   To install the **backend's requirements** navigate to the backend folder `cd backend`, then install the requirements pip `install -r requirements.txt`
    - To install the **frontend's requirements**, which is built in React,  you have to install the latest versions of **Node.js** and **npm**.

-   **Run the backend:**

    -   Navigate to backend's folder `cd backend`;
    -   Run the server's API `python3 app.py`.

-   **Run the frontend:**
    -   Open another terminal (in the root of the project), and run `npm start`.

## For Better Performance:

This project is done to run in 2 different ways:

-   Load data directly from the **source**;
-   Load data from local **csv files**.

By default the 1st one is being used, however if you want to experience better performance you can choose the 2nd one.

To change from the 1st option to the second, you just have to:

-   `cd backend`;
-   `python3 fill_csv_files.py`, to generate the csv files;
-   Open the file `backend/app.py` and change the 1st variable from `load_from_csv = False` to `load_from_csv = True`.

With this change you will experience better performance, however don't forget to update the csv files regularly.
