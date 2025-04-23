'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type Student = {
  id: string
  governorate: string
  fullName: string
  passportNumber: string
  whatsappNumber: string
  gender: string
  age: number
  residence: string
  qualification: string
  educationType: string
  job: string
  academicYear: string
  level: string
  specialization: string
  school: string
  attendanceSystem: string
  specialNeeds: string
  referenceNumber: string
  createdAt: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()
  
  // In a real application, this would be an API call to fetch students
  const fetchStudents = async () => {
    setLoading(true)
    try {
      // Mock data for demonstration
      const mockStudents: Student[] = [
        {
          id: '1',
          governorate: 'القاهرة',
          fullName: 'أحمد محمد علي حسن',
          passportNumber: 'A12345678',
          whatsappNumber: '+201234567890',
          gender: 'ذكر',
          age: 25,
          residence: 'مدينة نصر',
          qualification: 'بكالوريوس',
          educationType: 'أزهري',
          job: 'مدرس',
          academicYear: '',
          level: 'متوسطة',
          specialization: '',
          school: 'شافعي',
          attendanceSystem: 'مباشر',
          specialNeeds: 'لا',
          referenceNumber: 'REF-123456',
          createdAt: '2023-11-15'
        },
        {
          id: '2',
          governorate: 'الإسكندرية',
          fullName: 'فاطمة أحمد محمود سعيد',
          passportNumber: 'B87654321',
          whatsappNumber: '+201987654321',
          gender: 'أنثى',
          age: 22,
          residence: 'سموحة',
          qualification: 'ليسانس',
          educationType: 'عام',
          job: '',
          academicYear: 'الرابعة',
          level: 'تخصصية',
          specialization: 'فقه',
          school: 'مالكي',
          attendanceSystem: 'عن بعد',
          specialNeeds: 'لا',
          referenceNumber: 'REF-654321',
          createdAt: '2023-11-14'
        }
      ]
      
      setStudents(mockStudents)
    } catch (err) {
      setError('حدث خطأ أثناء جلب البيانات')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // In a real application, this would be an API call to authenticate
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true)
      fetchStudents()
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة')
    }
  }
  
  const handleExportExcel = () => {
    // In a real application, this would call an API endpoint to generate and download an Excel file
    alert('تم تصدير البيانات بنجاح')
  }
  
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">تسجيل الدخول للمشرف</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">اسم المستخدم</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              تسجيل الدخول
            </button>
          </form>
        </div>
      </main>
    )
  }
  
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">لوحة تحكم المشرف</h1>
          
          <div className="flex space-x-2">
            <button
              onClick={handleExportExcel}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              تصدير إلى Excel
            </button>
            
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              تسجيل الخروج
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-8">جاري تحميل البيانات...</div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الرقم المرجعي
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الاسم
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المحافظة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      رقم الواتس
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      المرحلة
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      نظام الحضور
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      تاريخ التسجيل
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.referenceNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.fullName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.governorate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.whatsappNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.level === 'preparatory' ? 'تمهيدية' : 
                         student.level === 'intermediate' ? 'متوسطة' : 
                         student.level === 'specialized' ? 'تخصصية' : student.level}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.attendanceSystem === 'inPerson' ? 'مباشر' : 
                         student.attendanceSystem === 'remote' ? 'عن بعد' : student.attendanceSystem}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {student.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
