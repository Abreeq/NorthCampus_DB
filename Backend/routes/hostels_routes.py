from flask import Blueprint, jsonify, request
import mysql.connector
import config

hostel_bp = Blueprint('hostel_bp', __name__)

def get_db():
    return mysql.connector.connect(
        host=config.MYSQL_HOST,
        user=config.MYSQL_USER,
        password=config.MYSQL_PASSWORD,
        database=config.MYSQL_DB
    )

# GET /hostels           -> list all hostels
# GET /hostels/<id>      -> get single hostel by id
@hostel_bp.route('/', methods=['GET'])
def list_hostels():
    db = get_db()
    cursor = db.cursor(dictionary=True)
    try:
        cursor.execute("SELECT * FROM hostels ORDER BY id")
        rows = cursor.fetchall()
        return jsonify(rows), 200
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()

# POST /hostels

@hostel_bp.route('/', methods=['POST'])
def add_hostel():
    if not request.is_json:
        return jsonify({'error': 'Request body must be JSON'}), 400
    data = request.get_json(silent=True) or {}

    required = ['name', 'type', 'capacity', 'students_residing']
    missing = [f for f in required if f not in data]
    if missing:
        return jsonify({'error': f'Missing fields: {", ".join(missing)}'}), 400

    # Basic validation
    try:
        typ = str(data['type']).upper()
        if typ not in {'BOYS', 'GIRLS', 'MIXED', 'OTHER'}:
            return jsonify({'error': "type must be one of: BOYS, GIRLS, MIXED, OTHER"}), 400

        capacity = int(data['capacity'])
        students_residing = int(data['students_residing'])
        if capacity < 0 or students_residing < 0:
            return jsonify({'error': 'capacity and students_residing must be >= 0'}), 400

        number_of_rooms = None
        if 'number_of_rooms' in data and data['number_of_rooms'] is not None:
            number_of_rooms = int(data['number_of_rooms'])
            if number_of_rooms < 0:
                return jsonify({'error': 'number_of_rooms must be >= 0'}), 400
    except (ValueError, TypeError):
        return jsonify({'error': 'Numeric fields must be integers'}), 400

    if students_residing > capacity:
        return jsonify({'error': 'students_residing cannot exceed capacity'}), 400

    db = get_db()
    cursor = db.cursor()
    try:
        cursor.execute("""
            INSERT INTO hostels
              (name, type, capacity, students_residing)
            VALUES (%s, %s, %s, %s)
        """, (
            data['name'],
            typ,
            capacity,
            students_residing,
        ))
        db.commit()
        new_id = cursor.lastrowid
        # Return created resource location and id
        return jsonify({'message': 'Hostel added', 'id': new_id}), 201
    except mysql.connector.Error as err:
        db.rollback()
        return jsonify({'error': str(err)}), 500
    finally:
        cursor.close()
        db.close()