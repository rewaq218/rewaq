'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type FormInputs = {
  governorate: string
  fullName: string
  passportNumber: string
  whatsappNumber: string
  gender: 'male' | 'female'
  age: number
  residence: string
  qualification: string
  educationType: 'general' | 'azhar' | 'other'
  job: string
  academicYear: string
  level: 'preparatory' | 'intermediate' | 'specialized'
  specialization: 'fiqh' | 'arabic' | 'creed' | 'tafsir_hadith' | ''
  school: 'maliki' | 'hanafi' | 'shafii'
  attendanceSystem: 'inPerson' | 'remote'
  specialNeeds: 'yes' | 'no'
  idCardImage: FileList
  qualificationImage: FileList
  paymentReceiptImage: FileList
}

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState('')
  
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<FormInputs>()
  
  const selectedLevel = watch('level')
  
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsSubmitting(true)
    
    try {
      // In a real application, you would send this data to your API
      console.log(data)
      
      // Generate a reference number (in a real app, this would come from the backend)
      const generatedRefNumber = 'REF-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
      setReferenceNumber(generatedRefNumber)
      
      // Reset the form and show success message
      reset()
      setSubmitSuccess(true)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">تسجيل بيانات دارسي العلوم الشرعية</h1>
        
        {submitSuccess ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6">
            <h2 className="font-bold text-xl mb-2">تم التسجيل بنجاح!</h2>
            <p>الرقم المرجعي الخاص بك: <strong>{referenceNumber}</strong></p>
            <p className="mt-4">يرجى الاحتفاظ بهذا الرقم للرجوع إليه في المستقبل.</p>
            <button 
              onClick={() => setSubmitSuccess(false)} 
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              تسجيل طالب جديد
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* البيانات الشخصية */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">البيانات الشخصية</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">المحافظة</label>
                  <input
                    type="text"
                    {...register('governorate', { required: 'هذا الحقل مطلوب' })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.governorate && <p className="text-red-500 text-sm mt-1">{errors.governorate.message}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">الاسم رباعي</label>
                  <input
                    type="text"
                    {...register('fullName', { required: 'هذا الحقل مطلوب' })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">رقم جواز السفر</label>
                  <input
                    type="text"
                    {...register('passportNumber', { required: 'هذا الحقل مطلوب' })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.passportNumber && <p className="text-red-500 text-sm mt-1">{errors.passportNumber.message}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">رقم الواتس</label>
                  <input
                    type="text"
                    {...register('whatsappNumber', { required: 'هذا الحقل مطلوب' })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.whatsappNumber && <p className="text-red-500 text-sm mt-1">{errors.whatsappNumber.message}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">النوع</label>
                  <select
                    {...register('gender', { required: 'هذا الحقل مطلوب' })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">اختر النوع</option>
                    <option value="male">ذكر</option>
                    <option value="female">أنثى</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">السن</label>
                  <input
                    type="number"
                    {...register('age', { required: 'هذا الحقل مطلوب', min: { value: 10, message: 'يجب أن يكون العمر 10 سنوات على الأقل' } })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">محل الإقامة</label>
                  <input
                    type="text"
                    {...register('residence', { required: 'هذا الحقل مطلوب' })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.residence && <p className="text-red-500 text-sm mt-1">{errors.residence.message}</p>}
                </div>
              </div>
            </div>
            
            {/* البيانات التعليمية */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">البيانات التعليمية</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">المؤهل الدراسي</label>
                  <input
                    type="text"
                    {...register('qualification', { required: 'هذا الحقل مطلوب' })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.qualification && <p className="text-red-500 text-sm mt-1">{errors.qualification.message}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">نوع التعليم</label>
                  <select
                    {...register('educationType', { required: 'هذا الحقل مطلوب' })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">اختر نوع التعليم</option>
                    <option value="general">عام</option>
                    <option value="azhar">أزهري</option>
                    <option value="other">أخرى</option>
                  </select>
                  {errors.educationType && <p className="text-red-500 text-sm mt-1">{errors.educationType.message}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">الوظيفة (إن وجدت)</label>
                  <input
                    type="text"
                    {...register('job')}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">السنة الدراسية (خاص بالطلاب)</label>
                  <input
                    type="text"
                    {...register('academicYear')}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
            </div>
            
            {/* بيانات التسجيل */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">بيانات التسجيل</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">المرحلة المتقدم لها</label>
                  <select
                    {...register('level', { required: 'هذا الحقل مطلوب' })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">اختر المرحلة</option>
                    <option value="preparatory">تمهيدية</option>
                    <option value="intermediate">متوسطة</option>
                    <option value="specialized">تخصصية</option>
                  </select>
                  {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level.message}</p>}
                </div>
                
                {selectedLevel === 'specialized' && (
                  <div>
                    <label className="block text-gray-700 mb-1">التخصص</label>
                    <select
                      {...register('specialization', { required: selectedLevel === 'specialized' ? 'هذا الحقل مطلوب' : false })}
                      className="w-full p-2 border rounded"
                    >
                      <option value="">اختر التخصص</option>
                      <option value="fiqh">فقه</option>
                      <option value="arabic">لغة عربية</option>
                      <option value="creed">العقيدة</option>
                      <option value="tafsir_hadith">تفسير وحديث</option>
                    </select>
                    {errors.specialization && <p className="text-red-500 text-sm mt-1">{errors.specialization.message}</p>}
                  </div>
                )}
                
                <div>
                  <label className="block text-gray-700 mb-1">المذهب</label>
                  <select
                    {...register('school', { required: 'هذا الحقل مطلوب' })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">اختر المذهب</option>
                    <option value="maliki">مالكي</option>
                    <option value="hanafi">حنفي</option>
                    <option value="shafii">شافعي</option>
                  </select>
                  {errors.school && <p className="text-red-500 text-sm mt-1">{errors.school.message}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">نظام الحضور</label>
                  <select
                    {...register('attendanceSystem', { required: 'هذا الحقل مطلوب' })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">اختر نظام الحضور</option>
                    <option value="inPerson">مباشر</option>
                    <option value="remote">عن بعد</option>
                  </select>
                  {errors.attendanceSystem && <p className="text-red-500 text-sm mt-1">{errors.attendanceSystem.message}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">من ذوي الهمم</label>
                  <select
                    {...register('specialNeeds', { required: 'هذا الحقل مطلوب' })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">اختر</option>
                    <option value="yes">نعم</option>
                    <option value="no">لا</option>
                  </select>
                  {errors.specialNeeds && <p className="text-red-500 text-sm mt-1">{errors.specialNeeds.message}</p>}
                </div>
              </div>
            </div>
            
            {/* المستندات */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-xl font-semibold mb-4">المستندات المطلوبة</h2>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">صورة البطاقة (وجه وظهر)</label>
                  <input
                    type="file"
                    {...register('idCardImage', { required: 'هذا الحقل مطلوب' })}
                    className="w-full p-2 border rounded"
                    accept="image/*"
                  />
                  {errors.idCardImage && <p className="text-red-500 text-sm mt-1">{errors.idCardImage.message}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">صورة المؤهل</label>
                  <input
                    type="file"
                    {...register('qualificationImage', { required: 'هذا الحقل مطلوب' })}
                    className="w-full p-2 border rounded"
                    accept="image/*"
                  />
                  {errors.qualificationImage && <p className="text-red-500 text-sm mt-1">{errors.qualificationImage.message}</p>}
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">صورة إيصال الدفع</label>
                  <input
                    type="file"
                    {...register('paymentReceiptImage', { required: 'هذا الحقل مطلوب' })}
                    className="w-full p-2 border rounded"
                    accept="image/*"
                  />
                  {errors.paymentReceiptImage && <p className="text-red-500 text-sm mt-1">{errors.paymentReceiptImage.message}</p>}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg"
              >
                {isSubmitting ? 'جاري التسجيل...' : 'تسجيل البيانات'}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}
