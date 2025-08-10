# Google Drive Gallery Setup Guide

## Quick Setup for Personal Photo Gallery

### Step 1: Organize Your Photos

1. **Create a main folder** in Google Drive called "Gallery" or "Personal Moments"
2. **Create subfolders** for each event/occasion:
   ```
   📁 My Gallery
   ├── 📁 Birthday Celebration 2024
   ├── 📁 Family Vacation
   ├── 📁 Graduation Ceremony
   ├── 📁 Team Outing
   ├── 📁 Holiday Moments
   └── 📁 Weekend Adventures
   ```
3. **Upload your photos** to the appropriate subfolders

### Step 2: Share Your Gallery Folder

1. **Right-click** on your main "Gallery" folder
2. Select **"Share"**
3. Click **"Change to anyone with the link"**
4. Set permission to **"Viewer"**
5. Click **"Copy link"**

### Step 3: Get Your Folder ID

From your copied link: `https://drive.google.com/drive/folders/1BXxxxxxxxxxxxxxxxxxxxxxxxZZ?usp=sharing`

The folder ID is: `1BXxxxxxxxxxxxxxxxxxxxxxxxZZ`

### Step 4: Create Google Drive API Key

1. **Go to** [Google Cloud Console](https://console.cloud.google.com/)
2. **Create a new project** or select existing one
3. **Enable Google Drive API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Drive API"
   - Click "Enable"
4. **Create API Key**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key

### Step 5: Configure Your Gallery

1. **Copy** `.env.example` to `.env` in your project root
2. **Add your configuration**:
   ```env
   VITE_GOOGLE_DRIVE_API_KEY=your_api_key_here
   VITE_GALLERY_MAIN_FOLDER=1BXxxxxxxxxxxxxxxxxxxxxxxxZZ
   ```

### Step 6: Test Your Gallery

1. **Run your development server**:
   ```bash
   npm run dev
   ```
2. **Navigate to** `/gallery`
3. **Your subfolders** should appear as categories automatically
4. **All photos** in each subfolder will be displayed

## Folder Structure Examples

### Personal Events
```
📁 Personal Gallery
├── 📁 2024 Birthday Party
├── 📁 Summer Vacation 2024
├── 📁 Graduation Day
├── 📁 Family Reunion
├── 📁 Christmas 2023
└── 📁 New Year Celebration
```

### Travel & Adventures
```
📁 Travel Memories
├── 📁 Paris Trip 2024
├── 📁 Beach Vacation
├── 📁 Mountain Hiking
├── 📁 City Exploration
└── 📁 Food Adventures
```

### Work & Achievements
```
📁 Professional Moments
├── 📁 Work Anniversary
├── 📁 Team Building 2024
├── 📁 Conference Presentation
├── 📁 Project Completion
└── 📁 Awards & Recognition
```

## Tips for Best Results

### Photo Organization
- **Name your subfolders** descriptively (they become category names)
- **Sort photos** by date for chronological order
- **Use consistent naming** for better search functionality
- **Keep file sizes reasonable** (under 10MB) for faster loading

### Privacy & Security
- **Only share** what you want to be public
- **Review permissions** regularly
- **Use specific folder sharing** rather than entire Drive
- **Consider creating a separate Google account** for public galleries

### Performance Optimization
- **Limit folders** to 20-30 for better performance
- **Keep photo count** under 100 per folder for optimal loading
- **Use JPEG format** for smaller file sizes
- **Organize by events** rather than dates for better categorization

## Troubleshooting

### Common Issues

1. **No photos showing**:
   - Check folder sharing permissions
   - Verify folder ID is correct
   - Ensure photos are in subfolders, not main folder

2. **API key not working**:
   - Verify Google Drive API is enabled
   - Check API key restrictions
   - Regenerate API key if needed

3. **Slow loading**:
   - Too many photos in single folder
   - Large file sizes
   - Check internet connection

### Fallback Options

If Google Drive setup doesn't work:
- The gallery automatically uses mock data
- Shows example personal events
- All features work with placeholder photos
- No functionality is lost

---

**Ready to showcase your life's beautiful moments!** 📸✨