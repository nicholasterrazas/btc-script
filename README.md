# BTC Script Analyzer

Final project for CS499 - Blockchain & Cryptofinance  
Experiment with the Bitcoin Script Language by creating scripts, simulating their execution, and evaluating their validity


## Usage  
Both the frontend and the backend need to be running for full capabilities.

### Backend setup
1. Within the 'backend/' directory, run the command `pip install -r requirements.txt` to make sure all dependencies are installed
2. Run the command `python -m uvicorn server:app --reload` to start the backend web server 
3. (Optional) Navigate to the url [http://localhost:8000/docs](http://localhost:8000/docs) to view the API endpoints and verify that the server is running

### Frontend setup
1. Within the 'frontend/' directory, run the command `npm install` to make sure all dependencies are installed
2. Run the command `npm run dev` to start the server for the frontend web page
3. Navigate to the url [http://localhost:5173/](http://localhost:5173/) to access the web page

