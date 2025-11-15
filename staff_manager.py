from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)
DB_NAME = "non_teaching_staff.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS staff (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sno INTEGER, staff_type TEXT, staff_group TEXT, sanctioned INTEGER, category TEXT,
            general_male INTEGER, general_female INTEGER, general_trans INTEGER,
            ews_male INTEGER, ews_female INTEGER, ews_trans INTEGER,
            sc_male INTEGER, sc_female INTEGER, sc_trans INTEGER,
            st_male INTEGER, st_female INTEGER, st_trans INTEGER,
            obc_male INTEGER, obc_female INTEGER, obc_trans INTEGER,
            total_male INTEGER, total_female INTEGER, total_trans INTEGER,
            pwd INTEGER, muslim INTEGER, minority INTEGER, other_minority INTEGER
        )
    ''')
    conn.commit()
    conn.close()

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        data = {k: request.form.get(k, '0') for k in [
            'sno', 'staff_type', 'staff_group', 'sanctioned', 'category',
            'general_male', 'general_female', 'general_trans',
            'ews_male', 'ews_female', 'ews_trans',
            'sc_male', 'sc_female', 'sc_trans',
            'st_male', 'st_female', 'st_trans',
            'obc_male', 'obc_female', 'obc_trans',
            'total_male', 'total_female', 'total_trans',
            'pwd', 'muslim', 'minority', 'other_minority'
        ]}
        def to_int_or_str(v):
            try:
                return int(v)
            except ValueError:
                return v
        data = {k: to_int_or_str(v) for k, v in data.items()}

        conn = sqlite3.connect(DB_NAME)
        c = conn.cursor()
        c.execute('''
            INSERT INTO staff VALUES (NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        ''', (
            data['sno'], data['staff_type'], data['staff_group'], data['sanctioned'], data['category'],
            data['general_male'], data['general_female'], data['general_trans'],
            data['ews_male'], data['ews_female'], data['ews_trans'],
            data['sc_male'], data['sc_female'], data['sc_trans'],
            data['st_male'], data['st_female'], data['st_trans'],
            data['obc_male'], data['obc_female'], data['obc_trans'],
            data['total_male'], data['total_female'], data['total_trans'],
            data['pwd'], data['muslim'], data['minority'], data['other_minority']
        ))
        conn.commit()
        conn.close()
        return redirect(url_for('index'))

    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("SELECT * FROM staff ORDER BY sno")
    records = c.fetchall()
    conn.close()
    return render_template('index.html', records=records)

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
