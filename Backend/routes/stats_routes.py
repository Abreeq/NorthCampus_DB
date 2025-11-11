from flask import Blueprint, jsonify
import mysql.connector
import config

stats_bp = Blueprint('stats_bp', __name__)

def get_db():
    return mysql.connector.connect(
        host=config.MYSQL_HOST,
        user=config.MYSQL_USER,
        password=config.MYSQL_PASSWORD,
        database=config.MYSQL_DB
    )

@stats_bp.route('/', methods=['GET'])
def get_stats():
    
    db = get_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT COUNT(*) AS count FROM departments")
    departments = cursor.fetchone()['count']

    cursor.execute("SELECT COUNT(*) AS count FROM students")
    students = cursor.fetchone()['count']

    cursor.execute("SELECT COUNT(*) AS count FROM courses")
    exams = cursor.fetchone()['count']  # example placeholder

    cursor.execute("SELECT COUNT(*) AS count FROM placements")
    placements = cursor.fetchone()['count']

    cursor.execute("SELECT COUNT(*) AS count FROM teaching_staff")
    staff = cursor.fetchone()['count']

    db.close()

    return jsonify({
        "departments": departments,
        "students": students,
        "exams": exams,
        "placements": placements,
        "staff": staff,
        "scholarships": 45,
        "hostels": 4,
        "library_books": 5000
    })
