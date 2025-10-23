from flask import Blueprint, jsonify, request
import mysql.connector
import config

courses_bp = Blueprint('courses_bp', __name__)

def get_db():
    return mysql.connector.connect(
        host=config.MYSQL_HOST,
        user=config.MYSQL_USER,
        password=config.MYSQL_PASSWORD,
        database=config.MYSQL_DB
    )

@courses_bp.route('/', methods=['GET'])
def get_courses():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM courses")
        data = cursor.fetchall()
        if not data:
            return jsonify({'error': 'No data found'}), 404
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()
    return jsonify(data)


@courses_bp.route('/', methods=['POST'])
def add_course():
    data = request.get_json()
    
    # Validate required fields
    required_fields = ["department_id","name","duration_years","exam_system","intake","gen_seats","obc_seats","sc_seats","st_seats","ews_seats"]
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({'error': f'Missing fields: {", ".join(missing)}'}), 400

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            INSERT INTO courses 
            (department_id,name,duration_years,exam_system,intake,gen_seats,obc_seats,sc_seats,st_seats,ews_seats)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """, (
            data['department_id'],data['name'],data['duration_years'],data['exam_system'],data['intake'],data['gen_seats'],data['obc_seats'],data['sc_seats'],data['st_seats'],data['ews_seats']
        ))
        db.commit()
        course_id = cursor.lastrowid
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()

    return jsonify({'message': 'Course added successfully', 'course_id': course_id}), 201

@courses_bp.route('/', methods=['PUT'])
def update_course():
    data = request.get_json()
    
    # Validate required fields
    required_fields = ["id","department_id","name","duration_years","exam_system","intake","gen_seats","obc_seats","sc_seats","st_seats","ews_seats"]
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({'error': f'Missing fields: {", ".join(missing)}'}), 400

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("SELECT * FROM courses WHERE id = %s", (data['id'],))
        course = cursor.fetchone()
        if not course:
            return jsonify({'error': 'Course not found'}), 404
        cursor.execute("""
            UPDATE courses
            SET department_id = %s, name = %s, duration_years = %s, exam_system = %s, intake = %s, gen_seats = %s, obc_seats = %s, sc_seats = %s, st_seats = %s, ews_seats = %s
            WHERE id = %s
        """, (
            data['department_id'],data['name'],data['duration_years'],data['exam_system'],data['intake'],data['gen_seats'],data['obc_seats'],data['sc_seats'],data['st_seats'],data['ews_seats'],data['id']
        ))
        db.commit()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()

    return jsonify({'message': 'Course updated successfully'}), 200

@courses_bp.route('/', methods=['DELETE'])
def delete_course():
    data = request.get_json()
    
    # Validate required fields
    required_fields = ["id"]
    missing = [field for field in required_fields if field not in data]
    if missing:
        return jsonify({'error': f'Missing fields: {", ".join(missing)}'}), 400

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("SELECT * FROM courses WHERE id = %s", (data['id'],))
        course = cursor.fetchone()
        if not course:
            return jsonify({'error': 'Course not found'}), 404
        cursor.execute("DELETE FROM courses WHERE id = %s", (data['id'],))
        db.commit()
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()

    return jsonify({'message': 'Course deleted successfully'}), 200