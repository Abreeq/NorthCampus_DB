from flask import Blueprint, jsonify, request
import mysql.connector
import config

placement_bp = Blueprint('placement_bp', __name__)

def get_db():
    return mysql.connector.connect(
        host=config.MYSQL_HOST,
        user=config.MYSQL_USER,
        password=config.MYSQL_PASSWORD,
        database=config.MYSQL_DB
    )


@placement_bp.route('/', methods=['POST'])
def add_placement():
    data = request.get_json()
    return jsonify({'message': 'Placement added successfully'}), 201