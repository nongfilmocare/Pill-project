import { RDU_MONOGRAPHS } from '../data/monographs';

// ฟังก์ชันแปลงรูปแบบยา (Dosage Form) เป็นไอคอนสุดเจ๋ง
export const getDosageIcon = (form) => {
  if (!form) return '💊';
  const f = form.toLowerCase();
  if (f.includes('tablet') || f.includes('cap') || f.includes('pill')) return '🥤';
  if (f.includes('cream') || f.includes('ointment') || f.includes('gel') || f.includes('lotion')) return '🧴';
  if (f.includes('inject') || f.includes('solution') || f.includes('infusion')) return '💉';
  if (f.includes('drop') || f.includes('eye') || f.includes('ophthalmic')) return '👁️';
  if (f.includes('syrup') || f.includes('suspension') || f.includes('liquid') || f.includes('mixture')) return '🧪';
  if (f.includes('spray') || f.includes('inhal') || f.includes('aerosol')) return '💨';
  return '💊';
};

// ฟังก์ชันจับคู่/แปลงข้อมูลยาทั่วไปเป็นคำอธิบายฉลากยา RDU ภาษาไทย (RDU Leaflet Matcher)
export const getRduDetails = (drug) => {
  if (!drug) return null;
  
  const activeIng = drug.a ? drug.a.toLowerCase() : '';
  const dosageForm = drug.d ? drug.d.toLowerCase() : '';
  
  // ค้นหาคำสำคัญในสารออกฤทธิ์ว่าตรงกับฐานข้อมูล RDU หรือไม่
  let matchedKey = null;
  if (activeIng.includes('clobetasol')) matchedKey = 'clobetasol';
  else if (activeIng.includes('paracetamol') || activeIng.includes('acetaminophen')) matchedKey = 'paracetamol';
  else if (activeIng.includes('amoxicillin')) matchedKey = 'amoxicillin';
  else if (activeIng.includes('ibuprofen')) matchedKey = 'ibuprofen';
  else if (activeIng.includes('atorvastatin')) matchedKey = 'atorvastatin';
  else if (activeIng.includes('metformin')) matchedKey = 'metformin';
  else if (activeIng.includes('omeprazole')) matchedKey = 'omeprazole';

  if (matchedKey && RDU_MONOGRAPHS[matchedKey]) {
    return {
      ...RDU_MONOGRAPHS[matchedKey],
      isFallback: false
    };
  }

  // Fallback Engine: สร้างข้อมูลคำแนะนำการใช้ยาอัตโนมัติตามรูปแบบยาและสารออกฤทธิ์
  let dynamicCategory = "ยารักษาโรค / ยาแผนปัจจุบัน";
  let dynamicInstructions = "ใช้ยานี้ตามคำสั่งของแพทย์หรือเภสัชกรอย่างเคร่งครัด";
  let dynamicPrecautions = "ห้ามแบ่งยาให้ผู้อื่นรับประทาน และเก็บให้พ้นมือเด็ก";
  let dynamicStorage = "ควรเก็บยาไว้ในที่แห้ง อุณหภูมิต่ำกว่า 30°C ป้องกันแสงแดดและความร้อน";
  
  // วิเคราะห์ประเภท/รูปแบบยา
  if (dosageForm.includes('tablet') || dosageForm.includes('capsule') || dosageForm.includes('pill')) {
    dynamicCategory = "ยารับประทาน (Oral Medicine)";
    dynamicInstructions = "รับประทานพร้อมน้ำสะอาดตามขนาดและเวลาที่ระบุบนฉลากยาอย่างสม่ำเสมอ";
  } else if (dosageForm.includes('cream') || dosageForm.includes('ointment') || dosageForm.includes('gel') || dosageForm.includes('lotion')) {
    dynamicCategory = "ยาใช้ภายนอก (Topical External Medicine)";
    dynamicInstructions = "ทาบางๆ บริเวณผิวหนังที่มีอาการตามความถี่ที่ระบุบนฉลากยา สำหรับใช้ภายนอกเท่านั้น ห้ามรับประทาน";
    dynamicPrecautions = "ระวังอย่าให้เข้าตา ปาก หรือทาบนแผลเปิดกว้าง หากมีอาการระคายเคืองให้หยุดใช้ทันที";
  } else if (dosageForm.includes('injection') || dosageForm.includes('solution for injection') || dosageForm.includes('infusion')) {
    dynamicCategory = "ยาฉีด (Injectable Medicine)";
    dynamicInstructions = "บริหารยาโดยบุคลากรทางการแพทย์หรือภายใต้การควบคุมตามมาตรฐานทางการแพทย์เท่านั้น";
  } else if (dosageForm.includes('eye drop') || dosageForm.includes('ophthalmic')) {
    dynamicCategory = "ยาหยอดตา (Eye Drops)";
    dynamicInstructions = "หยอดตาตามจำนวนหยดที่กำหนด ระวังอย่าให้ปลายหลอดหยดสัมผัสดวงตาหรือนิ้วมือ";
    dynamicStorage = "เก็บในที่แห้ง ป้องกันแสง และหลังจากเปิดขวดแล้วมักเก็บได้ไม่เกิน 30 วัน";
  }

  const cleanGeneric = drug.a ? drug.a : 'ไม่ระบุชื่อยาสามัญ';

  return {
    thaiGeneric: `${cleanGeneric} (รหัสมาตรฐาน TMT)`,
    category: dynamicCategory,
    indications: `ใช้บรรเทาหรือรักษาโรคตามข้อบ่งชี้ทางเภสัชกรรมของตัวยา ${cleanGeneric} ภายใต้การควบคุมของแพทย์หรือเภสัชกร`,
    instructions: dynamicInstructions,
    adverseEffects: `อาจเกิดอาการไม่พึงประสงค์เฉพาะบุคคล เช่น ผื่นคัน คลื่นไส้ หรือวิงเวียนศีรษะ หากมีอาการรุนแรงควรหยุดยาและพบแพทย์ทันที`,
    contraindications: `ห้ามใช้ในผู้ที่มีประวัติเคยแพ้ยา ${cleanGeneric} หรือส่วนประกอบของยานี้ หรือมีข้อห้ามใช้ทางการแพทย์อื่นๆ`,
    precautions: dynamicPrecautions,
    storage: dynamicStorage,
    isFallback: true
  };
};
