export type School = {
  id: string;
  name: string;
  shortName: string;
  image: string;
  emblem: string;
  accent: string;
};

export const schools: School[] = [
  {
    id: "municipal-1",
    name: "โรงเรียนเทศบาล 1 (วัดสัตตนารถปริวัตร)",
    shortName: "เทศบาล 1",
    image: "linear-gradient(135deg, #213f82, #9f742d)",
    emblem: "๑",
    accent: "#f7df9b"
  },
  {
    id: "municipal-2",
    name: "โรงเรียนเทศบาล 2 (วัดช่องลม)",
    shortName: "เทศบาล 2",
    image: "linear-gradient(135deg, #123a63, #5d9bb9)",
    emblem: "๒",
    accent: "#d9ecff"
  },
  {
    id: "demo-ratchaburi",
    name: "โรงเรียนสาธิตเทศบาลเมืองราชบุรี",
    shortName: "สาธิตเทศบาล",
    image: "linear-gradient(135deg, #0b1f4d, #d7aa42)",
    emblem: "สธ",
    accent: "#f7df9b"
  },
  {
    id: "municipal-4",
    name: "โรงเรียนเทศบาล 4 (วัดมหาธาตุวรวิหาร)",
    shortName: "เทศบาล 4",
    image: "linear-gradient(135deg, #3b2157, #d7aa42)",
    emblem: "๔",
    accent: "#e9c86f"
  },
  {
    id: "demo-phahonyothin",
    name: "โรงเรียนสาธิตพหลโยธินรามินทรภักดี",
    shortName: "สาธิตพหลโยธิน",
    image: "linear-gradient(135deg, #111827, #b8783c)",
    emblem: "พร",
    accent: "#f1b16d"
  }
];
