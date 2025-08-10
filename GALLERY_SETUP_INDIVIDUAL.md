# Individual Folder Gallery Setup

## Configuration Method: Option 2 Only

This gallery is configured to use **individual folder configuration only**. All mock data has been commented out to ensure only real Google Drive content is displayed.

## Setup Instructions

### Step 1: Create Individual Event Folders

Create separate folders in Google Drive for each event/category:

```
📁 Holiday Moments 2024
📁 Family Vacation Summer 2024
📁 Birthday Celebration
📁 Graduation Ceremony
📁 Team Building Event
📁 Weekend Adventures
```

### Step 2: Upload Photos to Each Folder

1. **Add photos** to each respective folder
2. **Name your photos** descriptively (names will be displayed in gallery)
3. **Sort by date** for chronological order

### Step 3: Share Each Folder Publicly

For each folder:
1. **Right-click** → **Share**
2. **Change to "Anyone with the link"**
3. **Set permission to "Viewer"**
4. **Copy the share link**
5. **Extract folder ID** from the URL

Example URL: `https://drive.google.com/drive/folders/1_19XVDG0w1OWsTZOxxAbi8578_hI4Zbb`
Folder ID: `1_19XVDG0w1OWsTZOxxAbi8578_hI4Zbb`

### Step 4: Configure Environment Variables

Update your `.env` file:

```env
# Google Drive API Configuration
VITE_GOOGLE_DRIVE_API_KEY=your_api_key_here

# Individual Folder Configuration
VITE_GALLERY_FOLDERS=Holiday Moments:1_19XVDG0w1OWsTZOxxAbi8578_hI4Zbb,Family Vacation:1CYxxxxxxxxxxxxxxxxxxxxxxxZZ,Birthday 2024:1DZxxxxxxxxxxxxxxxxxxxxxxxZZ

# Optional Settings
VITE_GALLERY_DEFAULT_QUALITY=medium
```

### Step 5: Get Google Drive API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable **Google Drive API**
4. Create **API Key** credentials
5. Copy the API key to your `.env` file

## Configuration Format

```env
VITE_GALLERY_FOLDERS=Category1:folder_id_1,Category2:folder_id_2,Category3:folder_id_3
```

### Rules:
- **Category names** become the event titles in your gallery
- **Folder IDs** must be the actual Google Drive folder IDs
- **Separate** each category:folder_id pair with commas
- **No spaces** around the colon separator
- **Spaces in category names** are allowed and encouraged

## Example Configurations

### Personal Events
```env
VITE_GALLERY_FOLDERS=Birthday Celebration 2024:1ABC123,Summer Vacation:1DEF456,Graduation Day:1GHI789
```

### Travel & Adventures
```env
VITE_GALLERY_FOLDERS=Paris Trip 2024:1JKL012,Beach Holiday:1MNO345,Mountain Hiking:1PQR678
```

### Work & Professional
```env
VITE_GALLERY_FOLDERS=Team Building 2024:1STU901,Conference Presentation:1VWX234,Project Completion:1YZA567
```

## Important Notes

### No Mock Data
- **All mock data is commented out**
- **Gallery will be empty** without proper Google Drive configuration
- **No fallback content** will be displayed

### Required Setup
- **Google Drive API key is mandatory**
- **At least one folder must be configured**
- **All folders must be publicly shared**

### Troubleshooting

**Empty Gallery:**
- Check that API key is correct
- Verify folder IDs are accurate
- Ensure folders are shared publicly
- Check browser console for errors

**Photos Not Loading:**
- Verify folders contain images
- Check folder permissions
- Ensure API key has proper access

**Category Not Showing:**
- Check folder ID format
- Verify folder exists and is shared
- Review environment variable syntax

## Testing Your Setup

1. **Start development server**: `npm run dev`
2. **Navigate to `/gallery`**
3. **Check browser console** for any errors
4. **Verify categories** appear with correct names
5. **Confirm photos load** in each category

---

**Ready to showcase your real Google Drive photos!** 📸

*All mock data has been removed - only your actual Google Drive content will be displayed.*