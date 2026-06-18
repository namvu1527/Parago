// ===================================================
// PARAGO - Mock Data for UI Development
// ===================================================

export interface User {
  id: string;
  name: string;
  avatar?: string;
  university: string;
  faculty: string;
  rating: number;
  totalRides: number;
  verified: boolean;
  isPremium: boolean;
  role: "passenger" | "driver" | "moderator" | "admin";
  trustScore: number;
  ecoPoints: number;
}

export interface Ride {
  id: string;
  driver: User;
  pickup: string;
  pickupShort: string;
  destination: string;
  destinationShort: string;
  departureTime: string;
  date: string;
  seats: number;
  seatsAvailable: number;
  price: number;
  mode: "community" | "gas-tip";
  status: "published" | "matched" | "confirmed" | "in-progress" | "completed" | "cancelled";
  matchScore?: number;
  distance: string;
  duration: string;
  vehicleType: "motorcycle" | "car";
  vehicleName?: string;
  recurring?: "daily" | "weekly";
  genderPreference?: "same" | "male" | "female" | "any";
  notes?: string;
  passengers: User[];
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  type: "text" | "image" | "ride-card" | "system";
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  rideId?: string;
}

export interface HostelListing {
  id: string;
  title: string;
  price: number;
  location: string;
  images: string[];
  roommates: number;
  area: number;
  contact: string;
  postedBy: User;
  postedAt: string;
}

export interface SocialPost {
  id: string;
  author: User;
  content: string;
  type: "need-ride" | "offer-ride" | "roommate" | "weekend-trip";
  likes: number;
  comments: number;
  shares: number;
  liked: boolean;
  createdAt: string;
  images?: string[];
}

export interface AdminStats {
  totalUsers: number;
  verifiedUsers: number;
  activeRides: number;
  completedRides: number;
  revenue: number;
  premiumSubscribers: number;
  safetyIncidents: number;
  rideCompletionRate: number;
  userRetention: number;
}

// ---- MOCK USERS ----
export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Nguyễn Minh Anh",
    university: "ĐH Bách Khoa Hà Nội",
    faculty: "Công nghệ Thực phẩm",
    rating: 4.9,
    totalRides: 127,
    verified: true,
    isPremium: true,
    role: "driver",
    trustScore: 95,
    ecoPoints: 2450,
  },
  {
    id: "u2",
    name: "Trần Đức Huy",
    university: "ĐH Bách Khoa Hà Nội",
    faculty: "CNTT",
    rating: 4.8,
    totalRides: 89,
    verified: true,
    isPremium: false,
    role: "driver",
    trustScore: 92,
    ecoPoints: 1800,
  },
  {
    id: "u3",
    name: "Lê Thị Hương",
    university: "ĐH Bách Khoa Hà Nội",
    faculty: "Kinh tế",
    rating: 4.7,
    totalRides: 45,
    verified: true,
    isPremium: false,
    role: "passenger",
    trustScore: 88,
    ecoPoints: 960,
  },
  {
    id: "u4",
    name: "Phạm Văn Đức",
    university: "ĐH Quốc Gia Hà Nội",
    faculty: "Luật",
    rating: 4.6,
    totalRides: 34,
    verified: true,
    isPremium: true,
    role: "driver",
    trustScore: 85,
    ecoPoints: 720,
  },
  {
    id: "u5",
    name: "Hoàng Thị Mai",
    university: "ĐH Bách Khoa Hà Nội",
    faculty: "Sinh học",
    rating: 5.0,
    totalRides: 67,
    verified: true,
    isPremium: false,
    role: "passenger",
    trustScore: 98,
    ecoPoints: 1540,
  },
];

export const currentUser: User = mockUsers[0];

// ---- MOCK RIDES ----
export const mockRides: Ride[] = [
  {
    id: "r1",
    driver: mockUsers[1],
    pickup: "KTX Bách Khoa, Hai Bà Trưng, Hà Nội",
    pickupShort: "KTX Bách Khoa",
    destination: "Đại học Bách Khoa Hà Nội, Đống Đa",
    destinationShort: "ĐH Bách Khoa",
    departureTime: "07:30",
    date: "Hôm nay",
    seats: 4,
    seatsAvailable: 2,
    price: 0,
    mode: "community",
    status: "published",
    matchScore: 95,
    distance: "3.2km",
    duration: "12 phút",
    vehicleType: "car",
    vehicleName: "Toyota Vios 2022",
    recurring: "daily",
    genderPreference: "any",
    notes: "Đi đúng giờ, có điều hòa 🚗",
    passengers: [mockUsers[2]],
  },
  {
    id: "r2",
    driver: mockUsers[3],
    pickup: "Cầu Giấy, Hà Nội",
    pickupShort: "Cầu Giấy",
    destination: "ĐH Quốc Gia Hà Nội, Xuân Thủy",
    destinationShort: "ĐH Quốc Gia",
    departureTime: "08:00",
    date: "Hôm nay",
    seats: 2,
    seatsAvailable: 1,
    price: 15000,
    mode: "gas-tip",
    status: "published",
    matchScore: 87,
    distance: "5.1km",
    duration: "18 phút",
    vehicleType: "motorcycle",
    recurring: "weekly",
    genderPreference: "any",
    passengers: [],
  },
  {
    id: "r3",
    driver: mockUsers[0],
    pickup: "Times City, Hai Bà Trưng",
    pickupShort: "Times City",
    destination: "ĐH Bách Khoa Hà Nội",
    destinationShort: "ĐH Bách Khoa",
    departureTime: "06:45",
    date: "Ngày mai",
    seats: 4,
    seatsAvailable: 3,
    price: 10000,
    mode: "gas-tip",
    status: "published",
    matchScore: 92,
    distance: "4.5km",
    duration: "15 phút",
    vehicleType: "car",
    vehicleName: "Honda City 2023",
    genderPreference: "any",
    notes: "Ghế rộng, đi nhẹ nhàng ✨",
    passengers: [],
  },
  {
    id: "r4",
    driver: mockUsers[4],
    pickup: "Thanh Xuân, Hà Nội",
    pickupShort: "Thanh Xuân",
    destination: "ĐH Bách Khoa Hà Nội",
    destinationShort: "ĐH Bách Khoa",
    departureTime: "07:15",
    date: "Hôm nay",
    seats: 2,
    seatsAvailable: 1,
    price: 0,
    mode: "community",
    status: "published",
    matchScore: 78,
    distance: "6.8km",
    duration: "22 phút",
    vehicleType: "motorcycle",
    genderPreference: "female",
    notes: "Chỉ nhận nữ, đi an toàn 💕",
    passengers: [],
  },
  {
    id: "r5",
    driver: mockUsers[1],
    pickup: "Hà Đông, Hà Nội",
    pickupShort: "Hà Đông",
    destination: "ĐH Bách Khoa Hà Nội",
    destinationShort: "ĐH Bách Khoa",
    departureTime: "07:00",
    date: "Hôm nay",
    seats: 4,
    seatsAvailable: 1,
    price: 20000,
    mode: "gas-tip",
    status: "matched",
    matchScore: 82,
    distance: "12km",
    duration: "35 phút",
    vehicleType: "car",
    vehicleName: "Mazda 3 2023",
    recurring: "daily",
    genderPreference: "any",
    passengers: [mockUsers[2], mockUsers[4]],
  },
];

// ---- MOCK CONVERSATIONS ----
export const mockConversations: Conversation[] = [
  {
    id: "c1",
    participant: mockUsers[1],
    lastMessage: "Ok bạn, 7:30 mình đón nhé!",
    lastMessageTime: "5 phút trước",
    unreadCount: 2,
    rideId: "r1",
  },
  {
    id: "c2",
    participant: mockUsers[2],
    lastMessage: "Cảm ơn bạn, chuyến đi rất thoải mái 😊",
    lastMessageTime: "1 giờ trước",
    unreadCount: 0,
  },
  {
    id: "c3",
    participant: mockUsers[3],
    lastMessage: "Bạn có thể đón ở ngã tư được không?",
    lastMessageTime: "3 giờ trước",
    unreadCount: 1,
    rideId: "r2",
  },
  {
    id: "c4",
    participant: mockUsers[4],
    lastMessage: "Mai mình đi sớm hơn 15p nha",
    lastMessageTime: "Hôm qua",
    unreadCount: 0,
  },
];

// ---- MOCK MESSAGES ----
export const mockMessages: Message[] = [
  { id: "m1", senderId: "u2", content: "Chào bạn! Mình đang tìm người đi chung từ KTX Bách Khoa đến trường, bạn có quan tâm không?", type: "text", timestamp: "07:20", read: true },
  { id: "m2", senderId: "u1", content: "Chào bạn! Mình cũng đi tuyến đó hàng ngày. Mình hay đi lúc 7:30 sáng.", type: "text", timestamp: "07:22", read: true },
  { id: "m3", senderId: "u2", content: "Tuyệt vời! 7:30 là vừa đẹp. Mình đi xe gì vậy bạn?", type: "text", timestamp: "07:23", read: true },
  { id: "m4", senderId: "u1", content: "Mình đi Toyota Vios, có điều hòa, 4 chỗ nha 🚗", type: "text", timestamp: "07:25", read: true },
  { id: "m5", senderId: "u2", content: "Ok bạn, 7:30 mình đón nhé!", type: "text", timestamp: "07:28", read: false },
  { id: "m6", senderId: "system", content: "⚠️ Không chia sẻ số điện thoại cá nhân qua tin nhắn", type: "system", timestamp: "07:28", read: true },
];

// ---- ADMIN STATS ----
export const mockAdminStats: AdminStats = {
  totalUsers: 12847,
  verifiedUsers: 9623,
  activeRides: 342,
  completedRides: 28456,
  revenue: 156780000,
  premiumSubscribers: 1247,
  safetyIncidents: 3,
  rideCompletionRate: 94.7,
  userRetention: 87.3,
};

export const mockChartData = {
  userGrowth: [
    { month: "T1", users: 2400 },
    { month: "T2", users: 3600 },
    { month: "T3", users: 5200 },
    { month: "T4", users: 6800 },
    { month: "T5", users: 8900 },
    { month: "T6", users: 12847 },
  ],
  ridesByDay: [
    { day: "T2", rides: 45 },
    { day: "T3", rides: 52 },
    { day: "T4", rides: 48 },
    { day: "T5", rides: 61 },
    { day: "T6", rides: 55 },
    { day: "T7", rides: 38 },
    { day: "CN", rides: 23 },
  ],
  revenueByMonth: [
    { month: "T1", revenue: 12000000 },
    { month: "T2", revenue: 18500000 },
    { month: "T3", revenue: 24300000 },
    { month: "T4", revenue: 28900000 },
    { month: "T5", revenue: 35600000 },
    { month: "T6", revenue: 37480000 },
  ],
};
