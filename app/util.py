from . import app, db
import datetime

def convert_to_seconds(time_str):
    """
    24-Hour Format
    %HH:%MM:%SS
    """
    return sum(x * int(t) for x, t in zip([1, 60, 3600], reversed(time_str.split(':'))))

def calc_day(year, month, day):
    t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4]
    month -= 1
    year -= 1 if month < 3 else 0
    days_of_the_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return days_of_the_week[(year + year//4 - year//100 + year//400 + t[month-1] + day) % 7]



#*****************************COURSES*********************************#

def courses_for_given_day(u_id, day, month, year):
	# gives courses for a given day

    the_day = datetime.date(int(year), int(month), int(day))

    cursor = db.execute("SELECT cid FROM takes where sid=%s", u_id)

    courses = []
    course_ids = []

    for course in cursor:
        course_ids.append(course[0])

    for course_id in course_ids:
        cursor = db.execute("SELECT * from courses where cid=%s", course_id)

        for course in cursor:
            cursor = db.execute("SELECT * from courses_meta where cid=%s", course_id)
            course_metas = cursor.fetchall()
            for course_meta in course_metas:
                start_date = course_meta[2]
                end_date = course_meta[3]

                if the_day < end_date and the_day > start_date and calc_day(start_date.year, start_date.month, start_date.day) == calc_day(the_day.year, the_day.month, the_day.day):
                    courses.append(course)

    return make_dictionary_from_tuples(courses)

def date_object(date):
    day = date["day"]
    month = date["month"]
    year = date["year"]
    return str(day) + "/" + str(month) + "/" + str(year)

def create_course(u_id, start_date, end_date, days_of_the_week, p_id):
     # cid |    name    | tid |  location  | start_time | end_time
     # INSERT INTO courses VALUES (DEFAULT, 'COMS 1004', 21, '501 LERNER', '16:00:00', '17:45:00');
    db.execute("INSERT INTO COURSES VALUES (DEFAULT, 'FAKE_CLASS', '%s', 'LOCATION*', '16:00:00', '17:45:00')", (p_id))

    c_id = db.execute("SELECT cid from COURSES WHERE tid=%s AND name=%s", (p_id, "FAKE_CLASS")).fetchone()[0]
    # mid | cid | start_date |  end_date  | recurrence_interval
    start_date = date_object(start_date)
    end_date = date_object(end_date)
    db.execute("INSERT INTO COURSES_META VALUES (DEFAULT, %s, %s, %s, '7 Days')", (c_id, start_date, end_date))


def make_dictionary_from_tuples(list_of_tuples):
    list_of_dict = []

    for tup in list_of_tuples:
        teacherTuple = get_professor(tup[2])

        dic = {}
        dic["courseId"] = tup[0]
        dic["courseName"] = tup[1]
        dic["teacherId"] = teacherTuple[0]
        dic["teacherName"] = teacherTuple[1] + ' ' + teacherTuple[2]
        dic["location"] = tup[3]
        dic["startTime"] = tup[4].hour * 3600
        dic["endTime"] = tup[5].hour * 3600
        from datetime import datetime, date
        dic["duration"] = dic["endTime"] - dic["startTime"]

        list_of_dict.append(dic)
        return list_of_dict

#*****************************COURSES_END*********************************#

#*****************************ASSIGNMENTS*********************************#

def get_all_assignments(u_id, date):
    courses = courses_for_given_day(u_id, date["day"], date["month"], date["year"])

    answer = []
    if len(courses) == 0:
        return []
    else:
        for course in courses:
            cursor = db.execute("SELECT * FROM assignments WHERE cid=%s", (course["courseId"]))
            for assignment in cursor:
                dic = {"assignmentName": assignment[2],
                        "assignmentId": assignment[0],
                        "courseName": course["courseName"],
                        "courseId": course["courseId"],
                        "dueDateTime": assignment[3],
                        }
                answer.append(dic)
    return answer
#*****************************ASSIGNMENTS_END*********************************#

#*****************************HELPER_METHODS*********************************#

def get_professor(p_id):
	cursor = db.execute("SELECT uid, first_name, last_name from users where uid=%s", p_id)
	return cursor.fetchone()

