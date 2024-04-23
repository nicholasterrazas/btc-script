from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from simulator import construct_script, simulate_script, print_simulation


app = FastAPI()

origins = [
    "http://localhost",
    "https://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
async def root():
    return {'message': 'welcome to btc-script'}

@app.get('/simulate')
async def get_simulation(script: str):
    print(f"Constructing script: {script}")
    constructed_script = construct_script(script)

    print(f"Simulating script: {constructed_script}")
    simulation = simulate_script(constructed_script)
    
    print_simulation(simulation)
    return simulation