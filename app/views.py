from . import app
from flask import render_template

@app.route('/')
def index():
    return render_template('index.html') 

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/sign-up')
def sign_up():
    return render_template('sign-up.html')

