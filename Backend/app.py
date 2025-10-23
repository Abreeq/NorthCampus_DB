from flask import Flask
from flask_cors import CORS
from routes.department_routes import department_bp
from routes.courses_routes import courses_bp
# from routes.student_routes import student_bp
# ... import other blueprints

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(department_bp, url_prefix="/api/departments")
app.register_blueprint(courses_bp, url_prefix="/api/courses")
# app.register_blueprint(student_bp, url_prefix="/api/students")
# ... register others similarly

if __name__ == "__main__":
    app.run(debug=True)
