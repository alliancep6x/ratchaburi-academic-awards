# ระบบประกาศผลการแข่งขันทักษะทางวิชาการ ระดับภาคกลาง 2569

เว็บไซต์ประกาศผลการแข่งขันของสำนักการศึกษา เทศบาลเมืองราชบุรี

## ใช้งานในเครื่อง

```bash
pnpm install
pnpm dev
```

เปิดเว็บที่ `http://127.0.0.1:3000`

## แก้ไขข้อมูล

- `src/data/schools.ts` รายชื่อโรงเรียน
- `src/data/competitions.ts` ตารางการแข่งขัน
- `src/data/results.ts` ผลการแข่งขัน
- `src/data/summary.ts` ตัวเลขสรุป

## Deploy บน Vercel

ใช้ค่าเริ่มต้นของ Vercel สำหรับ Next.js ได้เลย

- Framework Preset: `Next.js`
- Install Command: `pnpm install`
- Build Command: `pnpm build`
- Output Directory: ไม่ต้องตั้งค่า
