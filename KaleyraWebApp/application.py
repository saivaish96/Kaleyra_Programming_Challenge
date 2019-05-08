import os
import json
from flask import Flask
from flask import render_template
from flask import request
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "sqlite:///{}".format(os.path.join(project_dir, "userdatabase.db"))

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = database_file

db = SQLAlchemy(app)
ma = Marshmallow(app)
class User(db.Model):
    title = db.Column(db.String(80), unique=True, nullable=False, primary_key=True)
    number = db.Column(db.String(80))

    def __init__(self, title, number):
        self.title = title
        self.number = number
class UserSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ('title', 'number')

user_schema = UserSchema()
users_schema = UserSchema(many=True)
@app.route("/addUsers", methods=["GET", "POST"])
def addUsers():
    name = request.form["name"]
    number = request.form["number"]
    user = User(name,number)
    db.session.add(user)
    db.session.commit()
    return "OK"
@app.route("/getUsers", methods=["GET"])
def getUsers():
    users = User.query.all()
    for user in users:
        print("Name: "+ user.title + " Number: " + user.number)
    print('')
    result = users_schema.dump(users)
    return jsonify(result)
@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")
if __name__ == "__main__":
    app.run(debug=True)