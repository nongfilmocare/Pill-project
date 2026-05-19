import React from 'react';
import './globals.css';

export const metadata = {
  title: 'รู้เรื่องยา RDU - ระบบสืบค้นข้อมูลยาและรหัสยามาตรฐานแห่งชาติ TMT',
  description: 'ระบบสืบค้นข้อมูลยามาตรฐานประเทศไทย (Thai Medicines Terminology) กว่า 34,000 รายการ พร้อมคำแนะนำการใช้ยาผู้ป่วย RDU ความปลอดภัย และการเก็บรักษายาเพื่อคนไทย',
  keywords: 'RDU, รู้เรื่องยา, รหัสยามาตรฐาน TMT, ค้นหายาไทย, Thai Medicines Terminology, ยาสามัญ, ยาการค้า, ข้อบ่งใช้ยา',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        {/* Google Fonts Preconnect and link */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Kanit:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Prompt:wght@300;400;500;600;700&family=Sarabun:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
