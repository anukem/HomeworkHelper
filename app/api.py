from . import app, util
from flask import jsonify, render_template, request

###--- READ ---###

@app.route('/api/courses', methods=['POST', "GET"])
def get_courses():
    """
    endpoint for getting all courses or those on specific day
    if POST args other than userId provided
    @req_fmt = {
        "userId":   <int> -> session user id,
        "date":     <obj> -> {
            "day":      <int> -> queried day (1-31),
            "month":    <int> -> queried month (0-11),
            "year":     <int> -> queried year (4 digits),
        }
    }
    ** REQUESTED ** @resp_fmt = <obj>[] -> [{
        "courseName":   <str> -> course name,
        "courseId":     <int> -> course id,
        "location":     <str> -> location name,
        "teacherName":  <str> -> assoc teacher first+last name,
        "teacherId":    <str> -> assoc teacher (user) id,
        "startTime":    <int> -> start time in seconds,
        "endTime":      <int> -> end time in seconds,
        "duration":     <int> -> length in seconds
    }, ... ]
    """
    request_data = request.get_json()
    uid = request_data['userId']

    if request_data.get('date'): # get courses on @date
        date = request_data['date']['day']
        month = request_data['date']['month']
        year = request_data['date']['year']

        response = util.courses_for_given_day(uid, date, month, year)
        return jsonify({ 'courses': response })
    return # all user's courses

@app.route('/api/assignments', methods=['POST', 'GET'])
def get_assignments():
    """
    endpoint for getting user's assignments, whether it be all, those
    on a specific day, within a specific course, or some combination of the above
    @req_fmt = {
        "userId":   <int> -> session user id,
        "date":     '<obj> -> {
            "day":      <int> -> queried day (1-31),
            "month":    <int> -> queried month (0-11),
            "year":     <int> -> queried year (4 digits),
        },
        "courseId": '<int> -> assoc course id
    }
    ** REQUESTED ** @resp_fmt = <obj>[] -> [{
        "assignmentName":   <str> -> assignment name,
        "assignmentId":     <int> -> assoc assignment id,
        "priority":         <int> -> assoc assignment priority (1-5)
        "dueDatetime":      <obj> -> {
            "day":              <int> -> queried day (1-31),
            "month":            <int> -> queried month (0-11),
            "year":             <int> -> queried year (4 digits),
            "time":             <int> -> time due in seconds
        }
        "courseName":       <str> -> assoc course name,
        "courseId":         <int> -> assoc course id,
    }, ... ]
    """
    request_data = request.get_json()
    uid = request_data['uid']
    # if request_data.get('date') and request_data.get('course'):
    #     # specific user's assignments on due @date in @course
    #     return
    # elif request_data.get('date'):
    #     # get assignments due @date
    #     day = request_data['date']['day']
    #     month = request_data['date']['month']
    #     year = request_data['date']['year']

    #     return # specific user's assignments
    # elif request_data.get('course'):
    #     # all user's assignments in @course
    #     return

    return util.get_all_assignments(uid, request_data["date"])

@app.route('/api/teachers', methods=['POST'])
def get_teachers():
    """
    endpoint for getting all teachers
    @req_fmt = {}
    ** REQUESTED ** @resp_fmt = <obj>[] -> [{
        "teacherName":  <str> -> teacher first+last name,
        "teacherId":    <int> -> assoc teacher (user) id
    }, ... ]
    """
    return


###--- CREATE ---###


@app.route('/api/create-course', methods=['POST', 'GET'])
def create_course():
    """
    endpoint for course creation - assume weekly interval for now
    @req_fmt = {
        "userId":       <int> -> session user id,
        "courseName":   <str> -> course name,
        "location":     <str> -> location,
        "startDate":    <obj> -> {
            "day":          <int> -> day (1-31),
            "month":        <int> -> month (0-11),
            "year":         <int> -> year (4 didgits)
        },
        "endDate":      <obj> -> {
            "day":          <int> -> day (1-31),
            "month":        <int> -> month (0-11),
            "year":         <int> -> year (4 didgits)
        },
        "startTime":    <obj> -> {
            "hours":        <int> -> hours (0-23),
            "minutes":      <int> -> minutes (1-59),
            "seconds":      <int> -> seconds (1-59),
        },
        "endTime":    <obj> -> {
            "hours":        <int> -> hours (0-23),
            "minutes":      <int> -> minutes (1-59),
            "seconds":      <int> -> seconds (1-59),
        },
        "daysOfWeek":   <int>[] -> days of week (0-6)=(Sun-Sat),
        "teacherId"     <int> -> assoc teacher (user) id
    }
    """
    request_data = request.get_json()
    return util.create_course(request_data["userId"], 
    							request_data["startDate"], 
    							request_data["endDate"], 
    							request_data["daysOfWeek"],
    							request_data["teacherId"])

@app.route('/api/create-assignment', methods=['POST'])
def create_assignment():
    """
    endpoint for assignment creation
    @req_fmt = {
        "userId":       <int> -> session user id,
        "courseId":     <int> -> assoc course id,
        "dueDatetime":  <obj> -> {
            "day":          <int> -> queried day (1-31),
            "month":        <int> -> queried month (0-11),
            "year":         <int> -> queried year (4 digits),
            "time":         <int> -> time due in seconds
        }
    }
    """
    return


###--- UPDATE ---###


@app.route('/api/update-course', methods=['POST'])
def update_course():
    """
    endpoint for course updating - assume weekly interval for now
    @req_fmt = {
        "userId":       <int> -> session user id,
        "courseId":     <int> -> assoc course id,
        "courseName":   <str> -> course name,
        "location":     <str> -> location,
        "startDate":    <obj> -> {
            "day":          <int> -> day (1-31),
            "month":        <int> -> month (0-11),
            "year":         <int> -> year (4 didgits)
        },
        "endDate":      <obj> -> {
            "day":          <int> -> day (1-31),
            "month":        <int> -> month (0-11),
            "year":         <int> -> year (4 didgits)
        },
        "startTime":    <obj> -> {
            "hours":        <int> -> hours (0-23),
            "minutes":      <int> -> minutes (1-59),
            "seconds":      <int> -> seconds (1-59),
        },
        "endTime":    <obj> -> {
            "hours":        <int> -> hours (0-23),
            "minutes":      <int> -> minutes (1-59),
            "seconds":      <int> -> seconds (1-59),
        },
        "daysOfWeek":   <int>[] -> days of week (0-6)=(Sun-Sat),
        "teacherId"     <int> -> assoc teacher (user) id
    }
    """
    return

###--- DELETE ---###

@app.route('/api/delete-course', methods=['POST'])
def delete_course():
    """
    @req_fmt = {
        "userId":       <int> -> session user id,
        "courseId":     <int> -> assoc course id
    }
    """
    return

@app.route('/api/delete-assignment', methods=['POST'])
def delete_assignment():
    """
    @req_fmt = {
        "userId":       <int> -> session user id,
        "assignmentId": <int> -> assoc assignment id
    }
    """
    return
