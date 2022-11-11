from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://devvil:bolee@cluster0.lurbo7n.mongodb.net/?retryWrites=true&w=majority')
db = client.guestbook

@app.route('/')
def home():
   return render_template('guestbook.html')

@app.route("/guestbook", methods=["POST"])
def web_guestbook_post():
    usrname_receive = request.form['usrname_give']
    cntcomment_receive = request.form['cntcomment_give']

    doc = {
        'usrname': usrname_receive,
        'cntcomment': cntcomment_receive
    }
    db.guestbook.insert_one(doc)
    return jsonify({'msg': '방명록이 등록되었습니다.'})

@app.route("/guestbook", methods=["GET"])
def web_guestbook_get():
    return jsonify({'msg': 'GET 연결 완료!'})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)
