from flask import Flask, render_template, request, redirect
import csv

app = Flask(__name__)


@app.route('/')
def my_home():
    return render_template('index.html')


@app.route('/<string:page_name>')
def html_page(page_name):
    return render_template(page_name)


def write_to_file(data):
    with open('database.txt', mode='a') as db:
        email = data['email']
        subject = data['subject']
        message = data['message']
        file = db.write(f'\nEmail: {email} Subject: {subject} Message: {message}')


def write_to_csv(data):
    with open('database.csv', mode='a', newline='') as db2:
        email = data['email']
        subject = data['subject']
        message = data['message']
        csv_writer = csv.writer(db2, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        csv_writer.writerow([email, subject, message])


@app.route('/submit_form', methods=['POST', 'GET'])
def submit_form():
    if request.method == 'POST':
        try:
            data = request.form.to_dict()
            write_to_csv(data)
            return redirect('/thankyou.html')
        except FileNotFoundError:
            return 'Did not save to database'
    else:
        return 'Something went wrong'

# @app.route('/components.html')
# def components():
#     return render_template('components.html')
#
#
# @app.route('/contact.html')
# def contact():
#     return render_template('contact.html')
#
#
# @app.route('/index.html')
# def index():
#     return render_template('index.html')
#
#
# @app.route('/thankyou.html')
# def thankyou():
#     return render_template('thankyou.html')
#
#
# @app.route('/work.html')
# def work():
#     return render_template('work.html')
#
#
# @app.route('/works.html')
# def works():
#     return render_template('works.html')


# Steps to set up a Flask server
# 1. source venv/bin/activate
# 2. export FLASK_APP=server.py
# 3. flask run
# Debug mode allows us to just refresh the page instead of having to save the file each time a change is made
# To turn it on, run export FLASK_APP=server.py
