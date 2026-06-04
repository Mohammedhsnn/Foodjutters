import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1b4364',
          borderRadius: '50%',
          border: '2px solid #29abe2',
          color: '#fff',
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        FJ
      </div>
    ),
    { ...size }
  )
}
