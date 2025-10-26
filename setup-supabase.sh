#!/bin/bash

# This script helps you set up Supabase environment variables
# Run this script after creating your Supabase project

echo "🚀 PAGADA - Supabase Setup Helper"
echo "===================================="
echo ""
echo "Follow these steps to get your Supabase credentials:"
echo ""
echo "1. Go to https://app.supabase.com and create/open your project"
echo "2. Navigate to Settings → API (or Project Settings)"
echo "3. Copy your credentials from the 'Project URL' and 'Anon Key' sections"
echo ""
echo "Once you have your credentials, create a .env file in the project root:"
echo ""
echo "=== .env file content ==="
echo "REACT_APP_SUPABASE_URL=your_project_url"
echo "REACT_APP_SUPABASE_ANON_KEY=your_anon_key"
echo "=========================="
echo ""
echo "Then restart your development server:"
echo "npm start"
echo ""
echo "For more details, see SUPABASE_SETUP.md"
