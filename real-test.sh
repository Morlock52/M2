#!/bin/bash

echo "🔧 Testing M2 Website - Real Functionality Check"
echo "================================================="

# Test 1: Check if server is running from correct directory
echo "Test 1: Server directory check..."
if curl -s http://localhost:8000 | grep -q "M2 Installer Studio"; then
    echo "✅ Serving from correct directory (web/)"
else
    echo "❌ Not serving from web/ directory"
    exit 1
fi

# Test 2: Check if JavaScript loads and executes
echo "Test 2: JavaScript execution test..."
curl -s http://localhost:8000 > /tmp/test_page.html

# Check if key elements exist
if grep -q "startWizard" /tmp/test_page.html; then
    echo "✅ Start Wizard button found in HTML"
else
    echo "❌ Start Wizard button missing"
fi

# Test 3: Check if app.js loads
echo "Test 3: JavaScript file loading..."
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8000/app.js | grep -q "200"; then
    echo "✅ app.js loads successfully"
else
    echo "❌ app.js failed to load"
fi

# Test 4: Check for critical functions
echo "Test 4: Critical functions check..."
JS_CONTENT=$(curl -s http://localhost:8000/app.js)

if echo "$JS_CONTENT" | grep -q "class ConfigurationWizard"; then
    echo "✅ ConfigurationWizard class exists"
else
    echo "❌ ConfigurationWizard class missing"
fi

if echo "$JS_CONTENT" | grep -q "function bootstrap"; then
    echo "✅ Bootstrap function exists"
else
    echo "❌ Bootstrap function missing"
fi

if echo "$JS_CONTENT" | grep -q "DOMContentLoaded.*bootstrap"; then
    echo "✅ Bootstrap is called on DOM ready"
else
    echo "❌ Bootstrap not called on DOM ready"
fi

if echo "$JS_CONTENT" | grep -q "getElementById.*startWizard"; then
    echo "✅ Start Wizard button event listener setup"
else
    echo "❌ Start Wizard button event listener missing"
fi

# Test 5: Check data structures
echo "Test 5: Data structures check..."
if echo "$JS_CONTENT" | grep -q "const serviceCatalog"; then
    echo "✅ Service catalog exists"
else
    echo "❌ Service catalog missing"
fi

if echo "$JS_CONTENT" | grep -q "renderCatalog"; then
    echo "✅ Catalog rendering function exists"
else
    echo "❌ Catalog rendering function missing"
fi

echo "================================================="
echo "🎯 Manual Testing Instructions:"
echo "1. Open http://localhost:8000 in browser"
echo "2. Open Developer Tools (F12)"
echo "3. Check Console for errors"
echo "4. Click '🚀 Start Easy Setup Wizard' button"
echo "5. Check if wizard appears"
echo "6. Test Next/Back buttons"
echo "7. Test service selection"
echo "8. Test file generation"

rm -f /tmp/test_page.html
