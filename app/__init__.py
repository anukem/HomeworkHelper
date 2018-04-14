from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine

app = Flask(__name__, instance_relative_config=True, static_url_path='')

app.config.from_object('config')
app.config.from_pyfile('config.py') # load config from instance

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'], convert_unicode=True)
db = engine.connect()

from . import views
from . import api
