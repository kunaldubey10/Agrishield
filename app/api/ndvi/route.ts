import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { coordinates, startDate, endDate } = body

    console.log('Received request with:', { coordinates, startDate, endDate })

    if (!coordinates || !startDate || !endDate) {
      return NextResponse.json({
        success: false,
        error: 'Missing required parameters'
      }, { status: 400 })
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate mock NDVI data
    const meanNDVI = 0.6 + (Math.random() * 0.2) // Random value between 0.6 and 0.8

    return NextResponse.json({
      success: true,
      data: {
        meanNDVI,
        date: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('NDVI analysis error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      details: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
} 