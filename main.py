from flask import Flask, request, jsonify
from currencyapicom import Client
from config import CURRENCYAPI_KEY
  
app = Flask(__name__)
  
  
@app.route("/convert", methods=['GET'])
def convert():
   currency_input = request.args.get('base_currency_input', '')
   currency = request.args.get('currency', 'USD')
  
   if currency_input and currency in ['USD', 'CNY', 'GBR', 'EUR', 'CHF']:
       api_client = Client(CURRENCYAPI_KEY)
       response = api_client.latest(currency)
  
       response = jsonify([{'value': response['data'][x]['value'] * float(currency_input), 'code': x} for x in response['data'].keys()])
       response.headers.add("Access-Control-Allow-Origin", "*")
  
       return response