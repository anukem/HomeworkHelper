from sqlalchemy import *
from sqlalchemy.pool import NullPool
from flask import Flask, request, render_template, g, redirect, Response

app = Flask(__name__)

# global vars for accessing DB 
DATABASEURI = "postgresql://jea2161:1955@35.227.79.146/proj1part2"
engine = create_engine(DATABASEURI)

# connect to the DB and err out 
engine_connection = None 
try:
	engine_connection = engine.connect()
except:
	print("couldn't connect")
	import traceback; traceback.print_exc()
	g.conn = None

@app.route("/")
def login():
	return render_template("login.html")

if __name__ == "__main__":
	app.run(debug=True)
