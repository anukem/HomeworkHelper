from sqlalchemy import *
from sqlalchemy.pool import NullPool
from flask import Flask, request, render_template, g, redirect, Response

app = Flask(__name__)
DATABASEURI = "postgresql://jea2161:1955@35.227.79.146/proj1part2"

engine = create_engine(DATABASEURI)

@app.route("/")
def hello():
	try:
		engine.connect()
	except:
		print("couldn't connect")
		
	return render_template("index.html", name="john")

if __name__ == "__main__":
	app.run(debug=True)
