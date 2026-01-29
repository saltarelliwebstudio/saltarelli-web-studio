
# Chat Logging Implementation Plan

## Overview
Add conversation logging to track all chatbot interactions across all websites using your chatbot. Each conversation will be stored with the source website, making it easy to see what visitors are asking and how well the AI is responding.

## What You'll Get
- A dashboard-viewable log of every conversation
- See which website each chat came from
- Review full conversation threads (user question + AI response)
- Timestamps for each interaction
- No code changes needed on client websites (the edge function handles everything)

---

## Implementation Steps

### 1. Create the Database Table
Create a `chat_logs` table to store conversations:

| Column | Purpose |
|--------|---------|
| id | Unique identifier |
| session_id | Groups messages in same conversation |
| source_url | Which website the chat came from |
| user_message | What the visitor asked |
| assistant_message | How the AI responded |
| created_at | Timestamp |

### 2. Update the Edge Function
Modify `website-chat` to:
- Accept an optional `source_url` from the frontend
- After getting the AI response, save both the user message and AI response to the database
- Use a session ID to group messages from the same conversation

### 3. Update the Chatbot Component
Small change to pass the current page URL to the edge function so you know which site the chat came from.

---

## Technical Details

### Database Schema
```text
chat_logs table:
+------------------+------------+
| Column           | Type       |
+------------------+------------+
| id               | uuid (PK)  |
| session_id       | text       |
| source_url       | text       |
| user_message     | text       |
| assistant_message| text       |
| created_at       | timestamp  |
+------------------+------------+
```

### Edge Function Changes
- Import Supabase client for database writes
- Collect the full AI response from the stream
- Insert a log entry after each complete exchange

### Frontend Changes
- Generate a session ID when chat opens (persists for that conversation)
- Pass `window.location.origin` as the source URL

---

## Viewing Your Logs
After implementation, you can view all chat logs in the Cloud backend:
- Navigate to Cloud > Database > Tables > chat_logs
- Filter by source_url to see chats from specific websites
- Sort by created_at to see recent conversations

---

## Multi-Site Deployment Notes
When you add this chatbot to other websites:
1. They'll automatically log to the same central database
2. Each site's URL is captured, so you can filter/sort by site
3. No additional setup needed per site
