// التحقق من تسجيل الدخول
function checkLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        showAdminDashboard();
        loadStudents();
    } else {
        showLoginPage();
    }
}

// إظهار صفحة تسجيل الدخول
function showLoginPage() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
}

// إظهار لوحة تحكم المشرف
function showAdminDashboard() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
}

// معالجة تسجيل الدخول
async function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // في تطبيق حقيقي، يجب التحقق من بيانات الاعتماد بشكل آمن
    if (username === 'admin' && password === 'admin123') {
        localStorage.setItem('isLoggedIn', 'true');
        showAdminDashboard();
        loadStudents();
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
}

// تسجيل الخروج
function logout() {
    localStorage.removeItem('isLoggedIn');
    showLoginPage();
    document.getElementById('loginError').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

// تحميل بيانات الطلاب
async function loadStudents() {
    document.getElementById('loadingIndicator').style.display = 'block';
    document.getElementById('studentsTable').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';

    try {
        // محاولة الاتصال بقاعدة البيانات مع إعادة المحاولة
        let retries = 3;
        let result;

        while (retries > 0) {
            try {
                result = await getStudents();
                if (result.success) {
                    break;
                } else {
                    throw new Error(result.error?.message || 'فشل في جلب البيانات');
                }
            } catch (retryError) {
                console.error(`Error loading students (retries left: ${retries-1}):`, retryError);
                retries--;
                if (retries === 0) {
                    throw retryError;
                }
                // انتظار قبل إعادة المحاولة
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        if (result.success) {
            renderStudents(result.data);
            document.getElementById('loadingIndicator').style.display = 'none';
            document.getElementById('studentsTable').style.display = 'block';
        } else {
            throw new Error('فشل في جلب البيانات');
        }
    } catch (error) {
        document.getElementById('loadingIndicator').style.display = 'none';
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('errorMessage').textContent = `حدث خطأ أثناء جلب البيانات: ${error.message}`;
        console.error('Error loading students:', error);
    }
}

// عرض بيانات الطلاب في الجدول
function renderStudents(students) {
    const tableBody = document.getElementById('studentsTableBody');
    tableBody.innerHTML = '';

    if (students.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td colspan="7" class="px-6 py-4 text-center">لا توجد بيانات متاحة</td>
        `;
        tableBody.appendChild(row);
        return;
    }

    students.forEach(student => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';

        // تحويل المستويات إلى العربية
        let levelInArabic = student.level;
        if (student.level === 'preparatory') levelInArabic = 'تمهيدية';
        else if (student.level === 'intermediate') levelInArabic = 'متوسطة';
        else if (student.level === 'specialized') levelInArabic = 'تخصصية';

        // تحويل نظام الحضور إلى العربية
        let attendanceInArabic = student.attendance_system;
        if (student.attendance_system === 'inPerson') attendanceInArabic = 'مباشر';
        else if (student.attendance_system === 'remote') attendanceInArabic = 'عن بعد';

        // تنسيق التاريخ
        const createdAt = new Date(student.created_at).toLocaleDateString('ar-EG');

        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${student.reference_number}</td>
            <td class="px-6 py-4 whitespace-nowrap">${student.full_name}</td>
            <td class="px-6 py-4 whitespace-nowrap">${student.governorate}</td>
            <td class="px-6 py-4 whitespace-nowrap">${student.whatsapp_number}</td>
            <td class="px-6 py-4 whitespace-nowrap">${levelInArabic}</td>
            <td class="px-6 py-4 whitespace-nowrap">${attendanceInArabic}</td>
            <td class="px-6 py-4 whitespace-nowrap">${createdAt}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button
                    onclick="viewStudentDetails('${student.id}')"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
                >
                    عرض التفاصيل
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// عرض تفاصيل الطالب
async function viewStudentDetails(studentId) {
    // في تطبيق حقيقي، هنا سيتم جلب تفاصيل الطالب من قاعدة البيانات
    alert('سيتم عرض تفاصيل الطالب في الإصدار القادم');
}

// تصدير البيانات إلى Excel
async function exportToExcel() {
    try {
        document.getElementById('exportButton').disabled = true;
        document.getElementById('exportButton').textContent = 'جاري التصدير...';

        const result = await getStudents();

        if (!result.success) {
            throw new Error('فشل في جلب البيانات');
        }

        const students = result.data;

        // تحويل البيانات إلى تنسيق مناسب للتصدير
        const exportData = students.map(student => {
            // تحويل المستويات إلى العربية
            let levelInArabic = student.level;
            if (student.level === 'preparatory') levelInArabic = 'تمهيدية';
            else if (student.level === 'intermediate') levelInArabic = 'متوسطة';
            else if (student.level === 'specialized') levelInArabic = 'تخصصية';

            // تحويل نظام الحضور إلى العربية
            let attendanceInArabic = student.attendance_system;
            if (student.attendance_system === 'inPerson') attendanceInArabic = 'مباشر';
            else if (student.attendance_system === 'remote') attendanceInArabic = 'عن بعد';

            // تحويل النوع إلى العربية
            let genderInArabic = student.gender;
            if (student.gender === 'male') genderInArabic = 'ذكر';
            else if (student.gender === 'female') genderInArabic = 'أنثى';

            // تحويل نوع التعليم إلى العربية
            let educationTypeInArabic = student.education_type;
            if (student.education_type === 'general') educationTypeInArabic = 'عام';
            else if (student.education_type === 'azhar') educationTypeInArabic = 'أزهري';
            else if (student.education_type === 'other') educationTypeInArabic = 'أخرى';

            // تحويل المذهب إلى العربية
            let schoolInArabic = student.school;
            if (student.school === 'maliki') schoolInArabic = 'مالكي';
            else if (student.school === 'hanafi') schoolInArabic = 'حنفي';
            else if (student.school === 'shafii') schoolInArabic = 'شافعي';

            // تحويل ذوي الهمم إلى العربية
            let specialNeedsInArabic = student.special_needs;
            if (student.special_needs === 'yes') specialNeedsInArabic = 'نعم';
            else if (student.special_needs === 'no') specialNeedsInArabic = 'لا';

            // تنسيق التاريخ
            const createdAt = new Date(student.created_at).toLocaleDateString('ar-EG');

            return {
                'الرقم المرجعي': student.reference_number,
                'الاسم': student.full_name,
                'المحافظة': student.governorate,
                'رقم جواز السفر': student.passport_number,
                'رقم الواتس': student.whatsapp_number,
                'النوع': genderInArabic,
                'السن': student.age,
                'محل الإقامة': student.residence,
                'المؤهل الدراسي': student.qualification,
                'نوع التعليم': educationTypeInArabic,
                'الوظيفة': student.job || '',
                'السنة الدراسية': student.academic_year || '',
                'المرحلة': levelInArabic,
                'التخصص': student.specialization || '',
                'المذهب': schoolInArabic,
                'نظام الحضور': attendanceInArabic,
                'من ذوي الهمم': specialNeedsInArabic,
                'تاريخ التسجيل': createdAt
            };
        });

        // إنشاء ورقة عمل Excel
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'الطلاب');

        // تصدير الملف
        XLSX.writeFile(workbook, 'بيانات_الطلاب.xlsx');

        alert('تم تصدير البيانات بنجاح');
    } catch (error) {
        console.error('Error exporting data:', error);
        alert('حدث خطأ أثناء تصدير البيانات');
    } finally {
        document.getElementById('exportButton').disabled = false;
        document.getElementById('exportButton').textContent = 'تصدير إلى Excel';
    }
}

// استدعاء وظيفة التحقق من تسجيل الدخول عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // إضافة معالج حدث لنموذج تسجيل الدخول
    document.getElementById('loginForm').addEventListener('submit', handleLogin);

    // التحقق من تسجيل الدخول
    checkLogin();
});
