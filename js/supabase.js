// إعداد Supabase
const SUPABASE_URL = 'https://your-supabase-url.supabase.co';
const SUPABASE_ANON_KEY = 'your-supabase-anon-key';

// إنشاء عميل Supabase
const createClient = () => {
    return supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
};

// الحصول على عميل Supabase
const getSupabase = () => {
    if (typeof supabase === 'undefined') {
        console.error('Supabase غير متاح. تأكد من تضمين مكتبة Supabase.');
        return null;
    }
    return createClient();
};

// حفظ بيانات الطالب
async function saveStudent(studentData) {
    const client = getSupabase();
    if (!client) return { success: false, error: 'Supabase غير متاح' };

    try {
        // حفظ بيانات الطالب في جدول students
        const { data, error } = await client
            .from('students')
            .insert([studentData])
            .select();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('خطأ في حفظ بيانات الطالب:', error);
        return { success: false, error };
    }
}

// رفع ملف
async function uploadFile(file, path) {
    const client = getSupabase();
    if (!client) return { success: false, error: 'Supabase غير متاح' };

    try {
        const { data, error } = await client.storage
            .from('student_files')
            .upload(path, file);

        if (error) throw error;

        // الحصول على رابط عام للملف
        const { data: publicUrlData } = client.storage
            .from('student_files')
            .getPublicUrl(path);

        return { success: true, url: publicUrlData.publicUrl };
    } catch (error) {
        console.error('خطأ في رفع الملف:', error);
        return { success: false, error };
    }
}

// الحصول على جميع الطلاب
async function getStudents() {
    const client = getSupabase();
    if (!client) return { success: false, error: 'Supabase غير متاح' };

    try {
        const { data, error } = await client
            .from('students')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('خطأ في الحصول على بيانات الطلاب:', error);
        return { success: false, error };
    }
}

// البحث عن طالب بالرقم المرجعي
async function getStudentByReferenceNumber(referenceNumber) {
    const client = getSupabase();
    if (!client) return { success: false, error: 'Supabase غير متاح' };

    try {
        const { data, error } = await client
            .from('students')
            .select('*')
            .eq('reference_number', referenceNumber)
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error('خطأ في البحث عن الطالب:', error);
        return { success: false, error };
    }
}

// التحقق من وجود رقم مرجعي
async function checkReferenceNumber(referenceNumber) {
    const client = getSupabase();
    if (!client) return { success: false, error: 'Supabase غير متاح' };

    try {
        const { data, error, count } = await client
            .from('students')
            .select('*', { count: 'exact' })
            .eq('reference_number', referenceNumber);

        if (error) throw error;
        return { success: true, exists: count > 0 };
    } catch (error) {
        console.error('خطأ في التحقق من الرقم المرجعي:', error);
        return { success: false, error };
    }
}
