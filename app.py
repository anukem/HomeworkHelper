from sqlalchemy import *
from sqlalchemy.pool import NullPool
from flask import Flask, request, g, redirect, Response
from flask.ext.mako import MakoTemplates, render_template
from plim import preprocessor

# Mako so that we can use Plim processor 
app = Flask(__name__)
mako = MakoTemplates(app)
app.config['MAKO_PREPROCESSOR'] = preprocessor

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
	return render_template("login.slim")

if __name__ == "__main__":
	app.run(debug=True)
