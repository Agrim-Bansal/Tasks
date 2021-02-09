from flask import  Flask, render_template, request
from flask_cors import CORS
import pymongo
import urllib
from os import environ
from dotenv import load_dotenv 
from bson.objectid import ObjectId



load_dotenv()
password = urllib.parse.quote(environ['password'])

myclient = pymongo.MongoClient('mongodb+srv://Agrim:' + password + '@cluster0.v4kzc.mongodb.net/To-Do-List?retryWrites=true&w=majority')
db = myclient["Agrim"]
collection = db["Tasks"]


app = Flask(__name__)
CORS(app)


@app.route('/')
def helloWorld():
    return 'HelloWorld'



@app.route('/addTask', methods=['POST', 'GET'])
def add():
    if request.method == 'POST':
        task = request.json

        try :
            assert len(task) == 2 and task.get('task') != None and task.get('Due') != None
        except AssertionError:
            return {"Error" : "Add Only task and Due date and No extra data. \nFormat the request like {'task':'XYZ', 'Due':'dd/mm/yyyy' } "}
        try:
            collection.insert_one(task)

        except Exception as e :
            return {'Error' : str(e)}
        else:
            print('Success')
            return {'Success':'Task Added Successfully'}
        
        return {'Error' : 'Unidentified Error'}
    else:
        print('GET request')
        return {'Error' : 'Try sending a POST request'} 


@app.route('/getTasks', methods=['GET'])
def getTasks():
    els = "<div>"
    for i in collection.find({}, {'_id':1, 'task':1, 'Due':1}):
        date = (i['Due']).split('-')
        date = date[::-1]
        

        els += f"<div class = 'task-holder'> <div class='task-title'>{ i['task'] }</div> <div class='task-date'> { '-'.join(date) } </div><input id = {i['_id']} type='checkbox' class='task-check'></input> </div>"
    else :
        els += "\n </div>"
    return {'body':els}


@app.route('/delTasks', methods=['POST'])
def delTask():
    collection.delete_one({'_id' : ObjectId(request.json['id'])})
    print(request.json['id'])
    print(collection.find({}, {}))
    return {'Result' : 'Success'}



if __name__ == "__main__":
    app.run(debug=True)