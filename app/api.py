from . import app, db
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
    for i in range(1): # TODO: db
        start_time = convert_to_seconds('13:10:00')
        end_time = convert_to_seconds('14:25:00')
        course_info =  {
            'courseName': 'COMS4111',
            'professor': 'Professor Gravano',
            'location': 'Building B',
            'startTime': start_time, # seconds
            'endTime': end_time, # seconds
            'duration': end_time - start_time, # seconds
            'assignments': []
        }
        response.append(course_info)

    start_time = convert_to_seconds('10:10:00')
    end_time = convert_to_seconds('12:00:00')
    response.append({
        'courseName': 'ENGL2134',
        'professor': 'Professor Tennen',
        'location': 'Building A',
        'startTime': start_time, # seconds
        'endTime': end_time, # seconds
        'duration': end_time - start_time, # seconds
        'assignments': []
    });

    return jsonify({ 'day_schedule': response })


