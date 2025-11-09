import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crop Information',
  description: 'View and manage crop information including varieties, soil requirements, and sowing seasons.',
}

export default function CropInformationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
} 