import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const image = formData.get('image')

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Create a new FormData for the Flask backend
    const flaskFormData = new FormData()
    flaskFormData.append('image', image)

    // Forward the request to Flask backend
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      body: flaskFormData,
    })

    if (!response.ok) {
      throw new Error('Failed to get prediction from backend')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    )
  }
} 