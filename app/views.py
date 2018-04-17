from . import app
from flask import render_template

@app.route('/')
def index(): # main calendar view
    return render_template('partials/view.html')

@app.route('/login', methods=['GET', 'POST'])
def login(): # login view
    return render_template('partials/login.html')

@app.route('/sign-up', methods=['GET', 'POST'])
def sign_up(): # account creation
    return render_template('partials/signup.html')
