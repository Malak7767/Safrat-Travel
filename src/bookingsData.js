import ss2 from './assets/images/ss2.gif';
import ss3 from './assets/images/TokyoSkyline.jpg';
import ss4 from './assets/images/amalfi.jpg';
import ss5 from './assets/images/kyotojapan.jpg';
import b1 from './assets/images/b1.jpg';
import b2 from './assets/images/b2.jpg';
import b3 from './assets/images/b3.jpg';
import b4 from './assets/images/b4.jpg';
import c1 from './assets/images/c1.jpg';
import c2 from './assets/images/c2.jpg';
import a1 from './assets/images/a1.jpg';
import a2 from './assets/images/a2.jpg';
export const BOOKINGS_BY_CLIENT = {
  'Jinan Hasan': {
    id: 'SAF-2049',
    client: { name: 'Jinan Hasan', avatar: 'JH', trip: 'Honeymoon Package' },
    destination: 'Malé, Maldives',
    hero: ss2,  
    badge: 'HONEYMOON PACKAGE',
    dates: 'Aug 20 – Aug 26, 2025',
    nights: 6,
    guests: 2,
    route: 'London Heathrow → Velana Intl',
    status: 'Quoting',
    aiScore: 94,
    segments: 11,
    total: '$9,850',
    agent: { name: 'Layla K.', avatar: 'LK', role: 'Lead Agent' },
    costBreakdown: [
      { icon: '✈️', label: 'Flights (2 persons, return)', amount: '$6,400' },
      { icon: '🏨', label: 'Soneva Jani · 5 nights', amount: '$4,200' },
      { icon: '🚤', label: 'Transfers & seaplane', amount: '$960' },
      { icon: '🤿', label: 'Activities & experiences', amount: '$680' },
    ],
    days: [
      {
        id: 1, dayNum: 1, dayLabel: 'WED, AUG 20 · DEPARTURE',
        segments: [{
          id: 's1', time: '07:15', period: 'AM', timeLabel: 'Depart',
          imageKey: 'd2', icon: '✈️', title: 'British Airways · BA0197',
          image: b1,
          subtitle: 'London Heathrow (LHR) → Velana Intl (MLE)',
          detail: 'Business Class · 2 seats · ~10h 45m direct',
          tags: ['In-flight meals included', '2x 32kg checked'],
          price: '$3,200 / person', status: 'Seats held', statusCls: 'seg-status--blue',
        }],
      },
      {
        id: 2, dayNum: 2, dayLabel: 'THU, AUG 21 · ARRIVAL',
        segments: [
          {
            id: 's2', time: '09:00', period: 'AM', timeLabel: 'Arrive',
            imageKey: 'd3', icon: '🤿', title: 'Private Snorkelling Expedition',
            image: b2,
            subtitle: 'Guided · House Reef · 3 hours · Equipment included',
            detail: 'Marine biologist guide · Shark & ray spotting',
            tags: [], price: '$320', status: 'Booked', statusCls: 'seg-status--green',
          },
          {
            id: 's3', time: '15:00', period: 'PM', timeLabel: '',
            imageKey: 'd4', icon: '💆', title: 'Couples Spa Ritual',
            image: b3,
            subtitle: 'Soneva Jani Spa · 90-min ritual · Coconut & lemongrass',
            detail: 'Based on couple preference data & high reviews from similar guests',
            tags: [], price: '$680', status: 'AI Pick', statusCls: 'seg-status--purple',
            isAI: true,
          },
        ],
      },
      {
        id: 3, dayNum: '4–5', dayLabel: 'SAT–SUN, AUG 23–24 · LEISURE DAYS',
        isGroup: true, groupSummary: '3 Activities Planned',
        groupDetail: 'Dolphin cruise · Island hopping · Sunset kayak', confirmed: 2,
      },
      {
        id: 4, dayNum: 6, dayLabel: 'TUE, AUG 26 · DEPARTURE',
        segments: [{
          id: 's4', time: '11:30', period: 'AM', timeLabel: 'Depart',
          imageKey: 'd5', icon: '✈️', title: 'Return Flight · BA0198',
          image: b4,
          subtitle: 'Velana Intl (MLE) → London Heathrow (LHR) · Business Class',
          detail: 'Check out 10:00 · Resort transfer included',
          tags: [], price: '$3,200', status: 'Pending', statusCls: 'seg-status--amber',
        }],
      },
    ],
  },

  'Jad Wehbi': {
    id: 'SAF-3107',
    client: { name: 'Jad Wehbi', avatar: 'JW', trip: 'Tokyo Business' },
    destination: 'Tokyo, Japan',
    hero:ss3,
    badge: 'BUSINESS TRAVEL',
    dates: 'Sep 10 – Sep 14, 2025',
    nights: 4,
    guests: 1,
    route: 'JFK → Haneda Intl',
    status: 'Confirmed',
    aiScore: 89,
    segments: 6,
    total: '$5,400',
    agent: { name: 'Priya S.', avatar: 'PS', role: 'Senior Agent' },
    costBreakdown: [
      { icon: '✈️', label: 'Flight (1 person, return)', amount: '$3,200' },
      { icon: '🏨', label: 'Park Hyatt Tokyo · 4 nights', amount: '$1,800' },
      { icon: '🚕', label: 'Airport transfers', amount: '$220' },
      { icon: '🍱', label: 'Business dinner reservations', amount: '$180' },
    ],
    days: [
      {
        id: 1, dayNum: 1, dayLabel: 'WED, SEP 10 · DEPARTURE',
        segments: [{
          id: 's1', time: '23:10', period: 'PM', timeLabel: 'Depart',
          imageKey: 'd2', icon: '✈️', title: 'ANA · NH010',
          image: c1,
          subtitle: 'JFK → Haneda (HND)',
          detail: 'Business Class · 1 seat · 14h direct',
          tags: ['Lounge access included'],
          price: '$3,200', status: 'Confirmed', statusCls: 'seg-status--green',
        }],
      },
      {
        id: 2, dayNum: 2, dayLabel: 'THU, SEP 11 · MEETINGS',
        segments: [{
          id: 's2', time: '09:00', period: 'AM', timeLabel: '',
          imageKey: 'd4', icon: '💼', title: 'Client Meetings · Shinjuku',
          image: c2,
          subtitle: 'Full day · Private car on standby',
          detail: 'Hotel boardroom booked 9am–5pm',
          tags: [], price: '$0', status: 'Confirmed', statusCls: 'seg-status--green',
        }],
      },
      {
        id: 3, dayNum: 4, dayLabel: 'SUN, SEP 14 · DEPARTURE',
        segments: [{
          id: 's3', time: '17:30', period: 'PM', timeLabel: 'Depart',
          imageKey: 'd5', icon: '✈️', title: 'Return Flight · NH009',
          image:b4,
          subtitle: 'Haneda (HND) → JFK',
          detail: 'Business Class · Direct',
          tags: [], price: '$0', status: 'Confirmed', statusCls: 'seg-status--green',
        }],
      },
    ],
  },

  'Joyce Allam': {
    id: 'SAF-1882',
    client: { name: 'Joyce Allam', avatar: 'JA', trip: 'Amalfi Family' },
    destination: 'Amalfi, Italy',
    hero:ss4,
    badge: 'FAMILY TRIP',
    dates: 'Jul 18 – Jul 28, 2025',
    nights: 10,
    guests: 4,
    route: 'Heathrow → Naples Intl',
    status: 'Pending',
    aiScore: 91,
    segments: 9,
    total: '$12,400',
    agent: { name: 'Layla K.', avatar: 'LK', role: 'Lead Agent' },
    costBreakdown: [
      { icon: '✈️', label: 'Flights (4 persons, return)', amount: '$5,600' },
      { icon: '🏨', label: 'Villa Treville · 9 nights', amount: '$5,200' },
      { icon: '🚤', label: 'Boat transfers & private driver', amount: '$1,000' },
      { icon: '🎯', label: 'Kids activities & excursions', amount: '$600' },
    ],
    days: [
      {
        id: 1, dayNum: 1, dayLabel: 'FRI, JUL 18 · DEPARTURE',
        segments: [{
          id: 's1', time: '08:45', period: 'AM', timeLabel: 'Depart',
          imageKey: 'd2', icon: '✈️', title: 'British Airways · BA0552',
          image:b1,
          subtitle: 'Heathrow (LHR) → Naples (NAP)',
          detail: 'Economy Plus · 4 seats',
          tags: ['Family check-in priority'],
          price: '$1,400 / person', status: 'Pending', statusCls: 'seg-status--amber',
        }],
      },
      {
        id: 2, dayNum: '2–9', dayLabel: 'SAT–SAT, JUL 19–26 · COAST DAYS',
        isGroup: true, groupSummary: '5 family activities planned',
        groupDetail: 'Boat tour · Pottery class · Beach club · Pizza making · Lemon grove tour',
        confirmed: 3,
      },
      {
        id: 3, dayNum: 10, dayLabel: 'MON, JUL 28 · DEPARTURE',
        segments: [{
          id: 's3', time: '14:20', period: 'PM', timeLabel: 'Depart',
          imageKey: 'd5', icon: '✈️', title: 'Return Flight · BA0553',
          subtitle: 'Naples (NAP) → Heathrow (LHR)',
          image:b4,
          detail: 'Economy Plus · 4 seats',
          tags: [], price: '$1,400 / person', status: 'Pending', statusCls: 'seg-status--amber',
        }],
      },
    ],
  },

  'Rafic Younes': {
    id: 'SAF-2715',
    client: { name: 'Rafic Younes', avatar: 'RY', trip: 'Kyoto Cherry Blossom' },
    destination: 'Kyoto, Japan',
    hero: ss5,
    badge: 'CULTURAL ESCAPE',
    dates: 'Apr 1 – Apr 6, 2025',
    nights: 5,
    guests: 2,
    route: 'LAX → Kansai Intl',
    status: 'Quoting',
    aiScore: 96,
    segments: 8,
    total: '$7,200',
    agent: { name: 'Dana R.', avatar: 'DR', role: 'Senior Agent' },
    costBreakdown: [
      { icon: '✈️', label: 'Flights (2 persons, return)', amount: '$3,800' },
      { icon: '🏨', label: 'Boutique Ryokan · 5 nights', amount: '$2,400' },
      { icon: '🚄', label: 'Shinkansen passes', amount: '$400' },
      { icon: '🍵', label: 'Private tea ceremony & temple tours', amount: '$600' },
    ],
    days: [
      {
        id: 1, dayNum: 1, dayLabel: 'TUE, APR 1 · DEPARTURE',
        segments: [{
          id: 's1', time: '13:00', period: 'PM', timeLabel: 'Depart',
          imageKey: 'd2', icon: '✈️', title: 'JAL · JL062',
          subtitle: 'LAX → Kansai Intl (KIX)',
          image: a1,
          detail: 'Premium Economy · 2 seats',
          tags: ['Window seats confirmed'],
          price: '$1,900 / person', status: 'Seats held', statusCls: 'seg-status--blue',
        }],
      },
      {
        id: 2, dayNum: 2, dayLabel: 'WED, APR 2 · TEMPLES',
        segments: [{
          id: 's2', time: '10:00', period: 'AM', timeLabel: '',
          imageKey: 'd4', icon: '⛩️', title: 'Fushimi Inari & Tea Ceremony',
          subtitle: 'Private guide · Full day',
          image: a2,
          detail: '94% match to your cultural preferences',
          tags: [], price: '$300', status: 'AI Pick', statusCls: 'seg-status--purple', isAI: true,
        }],
      },
      {
        id: 3, dayNum: 5, dayLabel: 'SAT, APR 6 · DEPARTURE',
        segments: [{
          id: 's3', time: '16:45', period: 'PM', timeLabel: 'Depart',
          imageKey: 'd5', icon: '✈️', title: 'Return Flight · JL061',
          subtitle: 'Kansai Intl (KIX) → LAX',
          image:a1,
          detail: 'Premium Economy · 2 seats',
          tags: [], price: '$1,900 / person', status: 'Pending', statusCls: 'seg-status--amber',
        }],
      },
    ],
  },
}