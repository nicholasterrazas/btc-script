from fastapi import FastAPI
import simulator


app = FastAPI()


@app.get('/')
async def root():
    return {'message': 'welcome to btc-script'}

@app.get('/simulate/{script}')
async def get_simulation(script: str):
    print(script)
        
    simulation_steps = []
    return simulation_steps