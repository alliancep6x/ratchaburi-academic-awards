export type School = {
  id: string;
  name: string;
  shortName: string;
  image: string;
  emblem: string;
  logo?: string;
  accent: string;
};

export const schools: School[] = [
  {
    id: "municipal-1",
    name: "โรงเรียนเทศบาล 1 (วัดสัตตนารถปริวัตร)",
    shortName: "เทศบาล 1",
    image: "linear-gradient(135deg, #213f82, #9f742d)",
    emblem: "๑",
    logo: "/images/schools/municipal-1.jpg",
    accent: "#f7df9b"
  },
  {
    id: "municipal-2",
    name: "โรงเรียนเทศบาล 2 (วัดช่องลม)",
    shortName: "เทศบาล 2",
    image: "linear-gradient(135deg, #123a63, #5d9bb9)",
    emblem: "๒",
    logo: "/images/schools/municipal-2.jpg",
    accent: "#d9ecff"
  },
  {
    id: "demo-ratchaburi",
    name: "โรงเรียนสาธิตเทศบาลเมืองราชบุรี",
    shortName: "สาธิตเทศบาล",
    image: "linear-gradient(135deg, #0b1f4d, #d7aa42)",
    emblem: "สธ",
    logo: "/images/schools/demo-ratchaburi.jpg",
    accent: "#f7df9b"
  },
  {
    id: "municipal-4",
    name: "โรงเรียนเทศบาล 4 (วัดมหาธาตุวรวิหาร)",
    shortName: "เทศบาล 4",
    image: "linear-gradient(135deg, #3b2157, #d7aa42)",
    emblem: "๔",
    logo: "/images/schools/municipal-4.jpg",
    accent: "#e9c86f"
  },
  {
    id: "demo-phahonyothin",
    name: "โรงเรียนสาธิตพหลโยธินรามินทรภักดี",
    shortName: "สาธิตพหลโยธิน",
    image: "linear-gradient(135deg, #111827, #b8783c)",
    emblem: "พร",
    logo: "/images/schools/demo-phahonyothin.jpg",
    accent: "#f1b16d"
  }
];
