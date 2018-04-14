from . import app, util
from flask import jsonify, render_template, request

def convert_to_seconds(time_str):
    """ 
    24-Hour Format
    %HH:%MM:%SS
    """
    return sum(x * int(t) for x, t in zip([1, 60, 3600], reversed(time_str.split(':'))))

@app.route('/api/day-schedule', methods=['GET', 'POST'])
def day_schedule():
    request_data = request.get_json() 
    
    response = []

    # gather data from db 
    response = util.courses_for_given_day("63", request_data["day"], request_data["month"], request_data["year"])

    return jsonify({ 'day_schedule': response })


