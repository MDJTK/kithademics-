
import { Course } from './types';

export const COURSES: Course[] = [
  {
    id: 'practical-fiqh-101',
    title: 'Practical Fiqh: Acts of Worship',
    instructor: 'Shaykh Dr. Ahmad Ibrahim',
    category: 'Fiqh',
    description: 'A comprehensive study of the pillars of Islam, focusing on the practical application of Taharah, Salah, Zakat, and Sawm in daily life.',
    thumbnail: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800',
    progress: 45,
    price: 'Purchased',
    isLocked: false,
    lessons: [
      { 
        id: 'l1', 
        title: 'Introduction to Islamic Jurisprudence', 
        duration: '12:45', 
        isCompleted: true, 
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=300'
      },
      { 
        id: 'l2', 
        title: 'The Essentials of Purification (Taharah)', 
        duration: '24:10', 
        isCompleted: true, 
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=300'
      },
      { 
        id: 'l3', 
        title: 'Conditions and Pillars of Salah', 
        duration: '35:20', 
        isCompleted: false, 
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1564121211835-e88c852648ab?auto=format&fit=crop&q=80&w=300'
      },
      { 
        id: 'l4', 
        title: 'The Mechanics of Prayer: A Step-by-Step Guide', 
        duration: '42:15', 
        isCompleted: false, 
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=300'
      },
      { 
        id: 'l5', 
        title: 'Understanding Zakat: Calculation and Recipients', 
        duration: '28:30', 
        isCompleted: false, 
        videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1550592704-6c76fc9535e4?auto=format&fit=crop&q=80&w=300'
      },
    ]
  },
  {
    id: 'aqidah-foundations',
    title: 'Foundations of Aqidah',
    instructor: 'Ustadh Muhammad Ali',
    category: 'Theology',
    description: 'Exploring the core beliefs of Islam, the six pillars of Iman, and the attributes of Allah based on authentic tradition.',
    thumbnail: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&q=80&w=800',
    progress: 0,
    price: '$29.99',
    isLocked: true,
    lessons: [
      { 
        id: 'aq1', 
        title: 'Definition and Importance of Aqidah', 
        duration: '15:00', 
        isCompleted: false, 
        videoUrl: '#',
        thumbnail: 'https://images.unsplash.com/photo-1507643179173-61b86c089a3b?auto=format&fit=crop&q=80&w=300'
      },
      { 
        id: 'aq2', 
        title: 'The Six Pillars of Iman', 
        duration: '45:00', 
        isCompleted: false, 
        videoUrl: '#',
        thumbnail: 'https://images.unsplash.com/photo-1584824388173-054f137e3d17?auto=format&fit=crop&q=80&w=300'
      },
      { 
        id: 'aq3', 
        title: 'Tawheed and its Categories', 
        duration: '32:00', 
        isCompleted: false, 
        videoUrl: '#',
        thumbnail: 'https://images.unsplash.com/photo-1584824388173-054f137e3d17?auto=format&fit=crop&q=80&w=300'
      },
    ]
  },
  {
    id: 'prophetic-seerah',
    title: 'The Prophetic Biography (Seerah)',
    instructor: 'Dr. Fatima Zahra',
    category: 'History',
    description: 'A chronological journey through the life of Prophet Muhammad (peace be upon him) with emphasis on character and leadership lessons.',
    thumbnail: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=800',
    progress: 0,
    price: '$49.99',
    isLocked: true,
    lessons: [
      { 
        id: 'se1', 
        title: 'Pre-Islamic Arabia', 
        duration: '20:00', 
        isCompleted: false, 
        videoUrl: '#',
        thumbnail: 'https://images.unsplash.com/photo-1568853744655-b0e66d480790?auto=format&fit=crop&q=80&w=300'
      },
      { 
        id: 'se2', 
        title: 'The Year of the Elephant', 
        duration: '22:00', 
        isCompleted: false, 
        videoUrl: '#',
        thumbnail: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d743?auto=format&fit=crop&q=80&w=300'
      },
      { 
        id: 'se3', 
        title: 'Birth and Early Childhood', 
        duration: '25:00', 
        isCompleted: false, 
        videoUrl: '#',
        thumbnail: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d743?auto=format&fit=crop&q=80&w=300'
      },
      { 
        id: 'se4', 
        title: 'Marriage to Khadijah (RA)', 
        duration: '18:00', 
        isCompleted: false, 
        videoUrl: '#',
        thumbnail: 'https://images.unsplash.com/photo-1590076215667-875d4ef2d743?auto=format&fit=crop&q=80&w=300'
      },
    ]
  }
];
