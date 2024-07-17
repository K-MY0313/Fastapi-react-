from fastapi import FastAPI, Body, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    value1: float
    value2: float
    calculationsymbol: str

@app.post("/")
def calculate(data: InputData = Body(...)):
    number1 = data.value1
    number2 = data.value2
    cs = data.calculationsymbol

    try:
        if cs == "*":
            result = number1 * number2
        elif cs == "-":
            result = number1 - number2
        elif cs == "+":
            result = number1 + number2
        elif cs == "/":
            if number2 == 0:
                raise ZeroDivisionError("Cannot divide by zero")
            result = number1 / number2
        else:
            raise ValueError(f"Unknown operation: {cs}")
        
        return {"processed_value": result}
    except ZeroDivisionError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
