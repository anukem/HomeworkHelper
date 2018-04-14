from flask import Flask
# from flask.ext.sqlalchemy import SQLAlchemy
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, instance_relative_config=True, static_url_path='')

app.config.from_object('config')
app.config.from_pyfile('config.py') # load config from instance

# instantiate database
db = SQLAlchemy(app)

from . import views
from . import api
from . import models
