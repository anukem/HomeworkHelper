from . import app, db
import datetime


def calc_day(year, month, day):
    t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4]
    month -= 1
    year -= 1 if month < 3 else 0
    days_of_the_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    return days_of_the_week[(year + year//4 - year//100 + year//400 + t[month-1] + day) % 7]

# course_info =  {
#             'courseName': 'COMS4111',
#             'professor': 'Professor Gravano',
#             'location': 'Building B',
#             'startTime': start_time, # seconds
#             'endTime': end_time, # seconds
#             'duration': end_time - start_time, # seconds
#             'assignments': []
#         }
def courses_for_given_day(u_id, day, month, year):
	# gives courses for a given day

	the_day = datetime.date(int(year), int(month), int(day))

	cursor = db.execute("SELECT cid FROM takes where sid=" + u_id)

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

def make_dictionary_from_tuples(list_of_tuples):
	list_of_dict = []
	for tup in list_of_tuples:
		dic = {}

		dic["courseName"] = tup[1]
		dic["professor"] = get_professor(tup[2])
		dic["location"] = tup[3]
		dic["startTime"] = tup[4].hour * 3600
		dic["endTime"] = tup[5].hour * 3600
		from datetime import datetime, date
		dic["duration"] = dic["endTime"] - dic["startTime"]
		list_of_dict.append(dic)
	return list_of_dict

def get_professor(p_id):
	cursor = db.execute("SELECT first_name from users where uid=%s", p_id)
	return cursor.fetchone()[0]
