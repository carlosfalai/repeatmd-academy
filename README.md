# RepeatMD Academy

A comprehensive medical spa learning management system that transforms 90+ video transcripts into a linear, book-style learning platform. The system organizes lessons by yield potential with implementation checklists and progress tracking.

## 🌐 Live Demo

**Website:** [https://qtgnncyd.manus.space](https://qtgnncyd.manus.space)

## ✨ Features

### 📚 Content Organization
- **94 Lessons** extracted from Spartan Guide content
- **Star Rating System** (5-star NON-OPTIONAL to 1-star Nice-to-have)
- **Linear Progression** through lessons by priority
- **Implementation Checklists** for each lesson
- **Quick Insights** between lessons

### 🎨 User Interface
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Professional Medical Spa Aesthetic** - Clean, trustworthy design
- **Interactive Progress Tracking** - Visual progress bars and completion states
- **Search Functionality** - Find lessons by content or title
- **Star Rating Filters** - Filter lessons by priority level

### 📊 Progress Tracking
- **Overall Progress** - Percentage complete across all lessons
- **Category Progress** - Progress by star rating (5-star, 4-star, etc.)
- **Implementation Progress** - Checklist completion tracking
- **Persistent Storage** - Progress saved in browser localStorage

## 🎯 Content Structure

### Lesson Categories by Star Rating:
- **5-Star (NON-OPTIONAL):** 63 lessons - Highest yield strategies
- **4-Star (High Impact):** 18 lessons - High-impact strategies  
- **3-Star (Operational):** 3 lessons - Operational excellence
- **2-Star (Supporting):** 8 lessons - Supporting strategies
- **1-Star (Nice-to-have):** 2 lessons - Nice-to-have improvements

### Key Business Focus Areas:
- Patient retention and lifetime value optimization
- Membership program development and psychology
- Revenue optimization and conversion strategies
- Operational efficiency and time management
- Sales psychology and decision-making triggers
- Referral generation systems
- Consultation optimization

## 🚀 Technology Stack

### Frontend
- **React 18** with modern hooks and state management
- **Wouter** for client-side routing
- **Tailwind CSS** for responsive styling
- **shadcn/ui** components for professional UI
- **Lucide React** icons for visual elements

### Data Management
- JSON-based lesson data structure
- localStorage for progress persistence
- React state for real-time updates
- Efficient filtering and search algorithms

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/carlosfalai/repeatmd-academy.git
   cd repeatmd-academy
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm run dev
   # or
   npm run dev
   ```

4. **Build for production**
   ```bash
   pnpm run build
   # or
   npm run build
   ```

## 📁 Project Structure

```
repeatmd-academy/
├── src/
│   ├── assets/
│   │   └── lessons.json          # Lesson data
│   ├── App.jsx                   # Main application component
│   ├── App.css                   # Application styles
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Global styles
├── public/                       # Static assets
├── index.html                    # HTML template
├── package.json                  # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── vite.config.js               # Vite build configuration
└── README.md                    # Project documentation
```

## 🎓 Core Business Insights

The system integrates key business principles including:

- **"Confused mind doesn't buy"** - Core sales psychology principle
- **76% of patients become lifetime patients** after 3rd visit
- **68% of patients want memberships** but most practices don't offer them
- **82 referrals in 60 days** case study with exact implementation
- **Zero balance psychology** for premium spending triggers
- **Monthly recurring revenue** creates 2-3x valuation multipliers

## 📱 Responsive Design

- **Mobile First** - Optimized for smartphones and tablets
- **Touch Interactions** - Swipe navigation and touch-friendly buttons
- **Adaptive Layout** - Sidebar collapses on mobile devices
- **Cross-Browser** - Compatible with all modern browsers

## 🔒 Data & Privacy

- **Client-Side Storage** - All progress stored locally in browser
- **No Backend Required** - Fully functional without server dependencies
- **Privacy Focused** - No user data transmitted or stored externally

## 📈 Performance

- **Fast Loading** - Optimized React build with code splitting
- **Efficient Rendering** - Minimal re-renders with proper state management
- **Responsive Images** - Optimized for different screen sizes
- **Progressive Enhancement** - Works without JavaScript for basic content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern React and Tailwind CSS
- Inspired by medical spa business optimization strategies
- Designed for actionable learning and implementation

## 📞 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**RepeatMD Academy** - Transforming medical spa business education through structured, actionable learning experiences.

