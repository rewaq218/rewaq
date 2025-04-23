import { NextResponse } from 'next/server'

// In a real application, this would connect to a database
// For this example, we'll use a simple in-memory store
let students: any[] = []

export async function GET() {
  return NextResponse.json({ students })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Generate a reference number
    const referenceNumber = 'REF-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
    
    // Add the student to our "database"
    const newStudent = {
      id: Date.now().toString(),
      ...data,
      referenceNumber,
      createdAt: new Date().toISOString().split('T')[0]
    }
    
    students.push(newStudent)
    
    return NextResponse.json({ success: true, referenceNumber })
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
