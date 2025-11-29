# HostelCare - Complaint & Maintenance Management System

A complete React Native mobile application for managing hostel complaints with separate interfaces for Students and Wardens. Built with Expo and featuring a beautiful pastel UI design.

---

### Student Interface
- **Dashboard**: View complaint statistics and quick actions
- **Create Complaint**: Submit new issues with categories
- **Browse Complaints**: View and upvote all hostel complaints
- **Complaint Details**: Track status, add comments, and upvote

### Warden Interface
- **Dashboard**: Overview of all complaints with statistics
- **Manage Complaints**: Assign staff and update statuses
- **Analytics**: View insights, trends, and top issues

---

##  Features

###  Student Features
| Feature | Description |
|---------|-------------|
|  **Create Complaints** | Submit detailed complaints with title, description, and category |
|  **Personal Dashboard** | View your complaint statistics (Submitted, In Progress, Resolved) |
|  **Browse All Complaints** | See complaints from all students in the hostel |
|  **Upvoting System** | Upvote important complaints to prioritize them |
|  **Comments** | Add comments and discuss complaints |
|  **Advanced Filtering** | Filter by category and status |
|  **Real-time Updates** | Track complaint status changes instantly |
|  **Beautiful UI** | Modern pastel theme with smooth animations |

###  Warden/Staff Features
| Feature | Description |
|---------|-------------|
|  **Comprehensive Dashboard** | View all complaints with key metrics |
|  **View All Complaints** | Access complete complaint database with filters |
|  **Status Management** | Update complaints: Open → In Progress → Resolved → Closed |
|  **Staff Assignment** | Assign complaints to specific staff members |
|  **Analytics & Insights** | View trends, category breakdown, and top issues |
|  **Advanced Filtering** | Filter by category, status, and priority |
|  **Real-time Monitoring** | See updates as students submit complaints |
|  **View Comments** | Monitor student discussions and concerns |

---

##  Tech Stack

| Technology | Purpose |
|------------|---------|
| **React Native** | Cross-platform mobile development |
| **Expo** | Development framework and tooling |
| **React Navigation** | Navigation (Stack & Bottom Tabs) |
| **AsyncStorage** | Local data persistence |
| **JavaScript (ES6+)** | Programming language |

### Key Libraries
```json
{
  "@react-navigation/native": "^6.1.9",
  "@react-navigation/stack": "^6.3.20",
  "@react-navigation/bottom-tabs": "^6.5.11",
  "@react-native-async-storage/async-storage": "1.19.3",
  "react-native-gesture-handler": "~2.13.4"
}
```

---

##  Project Structure

```
hostel-care-app/
│
├── App.js                          # Main app entry point
├── package.json                    # Dependencies
├── app.json                        # Expo configuration
├── babel.config.js                 # Babel configuration
│
└── src/
    │
    ├── navigation/                 # Navigation configuration
    │   ├── StudentTabs.js         # Student bottom tab navigation
    │   └── WardenTabs.js          # Warden bottom tab navigation
    │
    ├── screens/                    # All screen components
    │   ├── HomeScreen.js          # Role selection screen
    │   │
    │   ├── student/               # Student screens
    │   │   ├── LoginScreen.js     # Login/Signup for students
    │   │   ├── HomeScreen.js      # Student dashboard
    │   │   ├── AddComplaint.js    # Create new complaint
    │   │   ├── MyComplaints.js    # View personal complaints
    │   │   ├── BrowseComplaints.js # Browse all complaints
    │   │   └── ComplaintDetail.js # Complaint details with upvote
    │   │
    │   └── warden/                # Warden screens
    │       ├── LoginScreen.js     # Warden login
    │       ├── HomeScreen.js      # Warden dashboard
    │       ├── AllComplaints.js   # View all complaints
    │       ├── ComplaintDetail.js # Manage complaint details
    │       └── Insights.js        # Analytics and insights
    │
    ├── components/                 # Reusable UI components
    │   ├── ScreenWrapper.js       # Safe area wrapper
    │   ├── CustomButton.js        # Styled button component
    │   ├── ComplaintCard.js       # Complaint card display
    │   ├── Input.js               # Text input component
    │   ├── DropDown.js            # Dropdown selector
    │   └── StatusBadge.js         # Status indicator badge
    │
    └── utils/                      # Utility functions
        ├── colors.js              # Color palette (pastel theme)
        └── helpers.js             # Helper functions & AsyncStorage
```

---

##  Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Expo CLI** - Install globally:
  ```bash
  npm install -g expo-cli
  ```
- **Expo Go** app on your mobile device ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Step-by-Step Setup

#### 1. Create Project Directory
```bash
mkdir hostel-care-app
cd hostel-care-app
```

#### 2. Initialize Project Structure
Create the folder structure as shown above and copy all the provided code files into their respective locations.

#### 3. Install Dependencies
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

#### 4. Start Development Server
```bash
npx expo start
```

Or:
```bash
expo start
```

#### 5. Run on Your Device

**Option A: Physical Device**
1. Open **Expo Go** app on your phone
2. Scan the QR code displayed in terminal
3. Wait for the app to load

**Option B: Emulator/Simulator**
- **Android**: Press `a` in terminal (requires Android Studio)
- **iOS**: Press `i` in terminal (requires Xcode - Mac only)

**Option C: Web Browser**
- Press `w` in terminal to open in web browser (limited features)

---

##  Color Palette

The app uses a modern pastel color scheme:

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Primary Blue** | `#6B8EF5` | Buttons, student theme, accents |
| **Primary Light** | `#A8C0FF` | Light backgrounds, badges |
| **Secondary Green** | `#7FE6B8` | Warden theme, success states |
| **Secondary Light** | `#B0F4D4` | Light backgrounds |
| **Status Open** | `#6B8EF5` | Open complaint badge |
| **Status Progress** | `#FFB86F` | In progress badge |
| **Status Resolved** | `#7FE6B8` | Resolved badge |
| **Background** | `#F8F9FE` | Main app background |
| **Card Background** | `#FFFFFF` | Card components |
| **Text Primary** | `#2D3748` | Main text |
| **Text Secondary** | `#718096` | Secondary text |
| **Border** | `#E8EAED` | Borders and dividers |

---

##  Data Management

### AsyncStorage Keys

| Key | Data Stored |
|-----|-------------|
| `@user` | Array of registered users |
| `@currentUser` | Currently logged-in user object |
| `@complaints` | Array of all complaints |
| `@staff` | Array of staff member names |

### Data Persistence

- **All data persists** across app restarts
- **Device-specific**: Data is stored locally on each device
- **No backend required**: Fully functional offline
- **Mock data**: Sample complaints are auto-generated on first launch

### Data Structure

**User Object:**
```javascript
{
  id: "student_1234567890",
  email: "john@example.com",
  password: "password123",
  name: "John Doe",
  roomNumber: "204",
  role: "student"
}
```

**Complaint Object:**
```javascript
{
  id: "complaint_123",
  title: "Broken WiFi in Room 204",
  description: "WiFi has been down for 3 days...",
  category: "Internet",
  status: "open", // open | in-progress | resolved | closed
  priority: "high",
  studentId: "student_1234567890",
  studentName: "John Doe",
  roomNumber: "204",
  createdAt: "2025-01-15T10:30:00.000Z",
  updatedAt: "2025-01-15T10:30:00.000Z",
  upvotes: 5,
  upvotedBy: ["student_123", "student_456"],
  comments: [
    {
      id: "comment_1",
      text: "Same issue here!",
      author: "Jane Smith",
      createdAt: "2025-01-15T11:00:00.000Z"
    }
  ],
  assignedTo: "IT Support",
  images: []
}
```

---

##  Complaint Status Workflow

```
┌─────────┐
│  OPEN   │ ← Student submits complaint
└────┬────┘
     │
     │ Warden assigns staff
     ▼
┌─────────────┐
│ IN PROGRESS │ ← Staff working on issue
└──────┬──────┘
       │
       │ Issue resolved
       ▼
┌──────────┐
│ RESOLVED │ ← Issue fixed
└────┬─────┘
     │
     │ Verified complete
     ▼
┌────────┐
│ CLOSED │ ← Final state
└────────┘
```

---

##  Configuration

### Complaint Categories

Edit categories in `src/utils/helpers.js`:

```javascript
export const CATEGORIES = [
  'Maintenance',
  'Plumbing',
  'Electrical',
  'Internet',
  'Cleaning',
  'Security',
  'Food',
  'Other',
];
```

### Staff Members

Edit staff list in `src/utils/helpers.js`:

```javascript
const mockStaff = [
  'Maintenance Staff',
  'Plumbing Staff',
  'Electrical Staff',
  'Cleaning Staff',
  'IT Support',
  'Security Staff',
];
```

### Color Theme

Customize colors in `src/utils/colors.js`:

```javascript
export default {
  primary: '#6B8EF5',
  secondary: '#7FE6B8',
  // ... more colors
};
```

---

##  Troubleshooting

### Common Issues and Solutions

#### 1. **Port Already in Use**
```bash
# Kill the process and restart
npx expo start --clear
```

#### 2. **Module Not Found Error**
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npx expo start -c
```

#### 3. **AsyncStorage Warnings**
These warnings are normal and don't affect functionality:
```
Warning: AsyncStorage has been extracted from react-native core
```
**Solution**: Already using `@react-native-async-storage/async-storage` ✅

#### 4. **Navigation Error**
```bash
# Ensure all navigation packages are installed
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler
```

#### 5. **Expo Go Not Connecting**
- Ensure phone and computer are on the same WiFi network
- Try scanning QR code again
- Restart Expo development server
- Restart Expo Go app

#### 6. **Build Errors on iOS**
```bash
# Clear iOS build cache (Mac only)
cd ios && pod install && cd ..
npx expo start -c
```

#### 7. **White Screen on Launch**
```bash
# Clear all caches
npx expo start -c
# Also clear Expo Go app cache in settings
```

---

##  Features Deep Dive

### Upvoting System

**How it works:**
- Each student can upvote a complaint once
- Upvote count is visible to all users
- Wardens can see most upvoted issues in Analytics
- Upvotes help prioritize important issues

**Technical Implementation:**
```javascript
// Upvote stored in complaint object
upvotedBy: ["student_123", "student_456"]
upvotes: 2
```

### Filtering System

**Available Filters:**
- **Category**: Maintenance, Plumbing, Electrical, Internet, Cleaning, Security, Food, Other
- **Status**: All, Open, In Progress, Resolved

**Usage:**
- Select filter from dropdown
- Results update instantly
- Multiple filters can be combined

### Comments System

**Features:**
- Add unlimited comments to any complaint
- Comments show author name and timestamp
- Comments are visible to all users
- No edit/delete (keeps record transparent)

### Real-time Updates

**Automatic refresh on:**
- Screen focus (when navigating back)
- Pull-to-refresh gesture
- After creating/updating data

---

##  Future Enhancements

### Version 2.0 Roadmap

- [ ] **Backend Integration**
  - REST API with Node.js/Express
  - PostgreSQL/MongoDB database
  - User authentication with JWT

- [ ] **Image Upload**
  - Camera integration
  - Photo attachments for complaints
  - Image gallery view

- [ ] **Push Notifications**
  - Status update alerts
  - New comment notifications
  - Assignment notifications for staff

- [ ] **Advanced Features**
  - Search functionality
  - Complaint priority levels
  - Due date tracking
  - Recurring issues detection

- [ ] **Analytics**
  - Resolution time tracking
  - Staff performance metrics
  - Category trends over time
  - Export reports (PDF/Excel)

- [ ] **Admin Panel**
  - Super admin role
  - User management
  - Staff management
  - System settings

- [ ] **Communication**
  - In-app messaging
  - Direct chat with staff
  - Complaint updates feed

---

##  Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Test on both iOS and Android
- Update README for new features

---

##  Support & Contact

- **Issues**: Create an issue in the repository
- **Questions**: Start a discussion in GitHub Discussions
- **Email**: support@hostelcare.com (if applicable)

---

##  Acknowledgments

- **Expo Team** - For the amazing development framework
- **React Native Community** - For comprehensive documentation
- **Contributors** - Everyone who helps improve this project

---

##  Project Stats

- **Lines of Code**: ~5,000+
- **Components**: 12
- **Screens**: 12
- **Utilities**: 2
- **Development Time**: Designed for scalability and maintainability

---

##  Quick Start Checklist

- [ ] Install Node.js and npm
- [ ] Install Expo CLI globally
- [ ] Clone/download the project
- [ ] Run `npm install`
- [ ] Run `npx expo start`
- [ ] Install Expo Go on your phone
- [ ] Scan QR code and test the app
- [ ] Create a student account
- [ ] Submit a test complaint
- [ ] Login as warden and manage it

