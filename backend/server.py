from fastapi import FastAPI
from simulator import construct_script, simulate_script, print_simulation


app = FastAPI()


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