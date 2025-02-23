-- Headmasters table (simplified)
CREATE TABLE IF NOT EXISTS headmasters (
    headmaster_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL
);

-- Teachers table (simplified)
CREATE TABLE IF NOT EXISTS teachers (
    teacher_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(500) NOT NULL,
    headmaster_id INTEGER NOT NULL,
    FOREIGN KEY (headmaster_id) REFERENCES headmasters(headmaster_id)
);

-- Classes table (simplified)
CREATE TABLE IF NOT EXISTS classes (
    class_id SERIAL PRIMARY KEY,
    class_name VARCHAR(50) NOT NULL,
    teacher_id INTEGER,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id)
);

-- Students table (simplified)
CREATE TABLE IF NOT EXISTS students (
    student_id SERIAL PRIMARY KEY,
    roll_no INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(500) NOT NULL,
    class_id INTEGER,
    FOREIGN KEY (class_id) REFERENCES classes(class_id)
);

-- Attendance records table
CREATE TABLE IF NOT EXISTS attendance (
    attendance_id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL,
    date DATE NOT NULL,
    img_url VARCHAR(300) NOT NULL,
    status VARCHAR(10) NOT NULL, -- 'present', 'absent'
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);