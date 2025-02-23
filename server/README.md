initialize DB using "node DB/init.js"
formData for uploading image and attendance data
{ file:ImageObject
data:{
date: "21-02-2025",
attendance: [
{ student_id: 2, present: true },
{ student_id: 3, present: false }
]
}
}
dateformat will remain 'DD-MM-YYYY' everywhere(frontend/backend)
