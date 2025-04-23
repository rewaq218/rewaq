-- إنشاء جدول الطلاب
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_number TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    passport_number TEXT NOT NULL,
    whatsapp_number TEXT NOT NULL,
    gender TEXT NOT NULL,
    age INTEGER NOT NULL,
    governorate TEXT NOT NULL,
    residence TEXT NOT NULL,
    qualification TEXT NOT NULL,
    education_type TEXT NOT NULL,
    job TEXT,
    academic_year TEXT,
    level TEXT NOT NULL,
    specialization TEXT,
    school TEXT NOT NULL,
    attendance_system TEXT NOT NULL,
    special_needs TEXT NOT NULL,
    id_card_url TEXT,
    qualification_url TEXT,
    payment_receipt_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إنشاء وظيفة لتحديث وقت التعديل
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- إنشاء محفز لتحديث وقت التعديل
CREATE TRIGGER update_students_updated_at
BEFORE UPDATE ON students
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- إنشاء سياسات الوصول للجدول
-- السماح للجميع بالقراءة
CREATE POLICY "Allow public read access" ON students
FOR SELECT USING (true);

-- السماح للجميع بالإضافة
CREATE POLICY "Allow public insert access" ON students
FOR INSERT WITH CHECK (true);

-- السماح فقط للمستخدمين المصرح لهم بالتعديل والحذف
CREATE POLICY "Allow authenticated update access" ON students
FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete access" ON students
FOR DELETE USING (auth.role() = 'authenticated');

-- إنشاء مخزن للملفات
-- يجب إنشاء مخزن "student_files" في واجهة Supabase

-- إنشاء سياسات الوصول للمخزن
-- السماح للجميع بالقراءة
INSERT INTO storage.policies (name, definition, bucket_id)
VALUES (
  'Public Read Access',
  '{"statement":"SELECT","effect":"ALLOW","principal":"*","conditions":{"bucket_id":"student_files"}}',
  'student_files'
);

-- السماح للجميع بالإضافة
INSERT INTO storage.policies (name, definition, bucket_id)
VALUES (
  'Public Insert Access',
  '{"statement":"INSERT","effect":"ALLOW","principal":"*","conditions":{"bucket_id":"student_files"}}',
  'student_files'
);

-- السماح فقط للمستخدمين المصرح لهم بالتعديل والحذف
INSERT INTO storage.policies (name, definition, bucket_id)
VALUES (
  'Authenticated Update Access',
  '{"statement":"UPDATE","effect":"ALLOW","principal":{"role":"authenticated"},"conditions":{"bucket_id":"student_files"}}',
  'student_files'
);

INSERT INTO storage.policies (name, definition, bucket_id)
VALUES (
  'Authenticated Delete Access',
  '{"statement":"DELETE","effect":"ALLOW","principal":{"role":"authenticated"},"conditions":{"bucket_id":"student_files"}}',
  'student_files'
);
